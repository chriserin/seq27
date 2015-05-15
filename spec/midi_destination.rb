require 'coremidi'
require 'coremidi/virtual_destination'

module Test
  class MidiDestination
    def initialize
      @midiDestination = CoreMIDI::VirtualDestination.new(1, nil)
      @midiDestination.connect("seq27-midi-output")
      @expected_packets = 0
      @recieved_packets = []
    end

    def collect
      @midiDeviceThread = Thread.new do
        packet_count = 0
        while(packets = @midiDestination.gets)
          next if are_packets_sysex?(packets)

          packet_count += 1
          @recieved_packets << packets
          break if packet_count == @expected_packets
        end
      end
    end

    def finish
      require 'timeout'
      Timeout.timeout(5) do
        @midiDeviceThread.join
      end

      return @recieved_packets
    end

    def expect(packet_count)
      @expected_packets = packet_count
    end

    private
    def are_packets_sysex?(packets)
      # The system exclusive messsages (11110000) come from software (ProLogic)
      # that has discovered this midi connection via core-midi
      # and are trying to communicate with it.
      # Ignore these messages.
      return packets.all? { |p| p[:data].first.to_s(2) == "11110000" }
    end
  end
end
