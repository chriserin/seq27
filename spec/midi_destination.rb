require 'coremidi'
require 'coremidi/virtual_destination'

class MidiTimeoutError < TimeoutError; end

module Test
  class MidiDestination
    def initialize(name)
      @midi_destination = CoreMIDI::VirtualDestination.new(1, nil)
      result = @midi_destination.connect(name)
      @expected_packets = 0
      @recieved_packets = []
    end

    def self.instance
      @singleton ||= new("seq27-midi-output")
    end

    def self.second_instance(name)
      @second_singleton ||= new(name)
    end

    def collect
      @midiDeviceThread = Thread.new do
        packet_count = 0
        while(packets = @midi_destination.gets)
          packets = filter_out_sysex(packets)
          packet_count += packets.count
          @recieved_packets.push *packets
          break if packet_count == @expected_packets
        end
      end
    end

    def finish
      require 'timeout'
      begin
        Timeout.timeout(5) do
          @midiDeviceThread.join
        end
      rescue TimeoutError => se
        raise MidiTimeoutError.new("Received #{@recieved_packets.count} packets but expected #{@expected_packets}")
      end

      result = @recieved_packets
      @recieved_packets = []
      return result
    end

    def expect(packet_count)
      @expected_packets = packet_count
    end

    def close
      @midi_destination.close
    end

    private
    #Sysex messages can come with
    def filter_out_sysex(packets)
      # The system exclusive messsages (11110000) come from softwares (GarageBand, Logic Pro)
      # that have discovered this midi connection via core-midi
      # and are trying to communicate with it.
      # Reject these messages.
      return packets.reject { |p| p[:data].first.to_s(2) == "11110000" }
    end
  end
end
