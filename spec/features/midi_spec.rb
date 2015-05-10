require 'spec_helper'
require 'rails_helper'
require 'midi_helper'

describe "Midi", type: :feature do
  before(:all) do
    @midiDestination = CoreMIDI::VirtualDestination.new(1, nil)
    @midiDestination.connect("seq27-midi-output")
  end

  it 'should see Midi object' do
    visit '/js_spec'
    result = page.evaluate_script("Midi")
    expect(result).to be
    result = page.evaluate_script("navigator.requestMIDIAccess")
    expect(result).to be
  end

  it 'should find midi output' do
    visit '/js_spec'
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05)
    result = page.evaluate_script("Midi.primaryOutput().name")
    expect(result).to eq "seq27-midi-output"
  end

  it 'should send midi signal' do
    visit '/js_spec'
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05)

    packets = nil
    midiDeviceThread = Thread.new do
      packets = @midiDestination.gets
      # The system exclusive messsages (11110000) come from software (ProLogic)
      # that has discovered this midi connection via core-midi
      # and are trying to communicate with it.
      # Ignore these messages.
      while packets.all? { |p| p[:data].first.to_s(2) == "11110000" }
        packets = @midiDestination.gets
      end
    end

    page.evaluate_script("Midi.sendOn(1, 80, 80)")

    require 'timeout'
    Timeout.timeout(5) do
      midiDeviceThread.join
    end

    expect(packets).to be
    expect(packets.count).to eq 1

    data = packets.first[:data]
    message_type = data[0] >> 4
    channel = data[0] - (message_type << 4)

    expect(message_type).to eq (on = 9)
    expect(channel).to eq 1
    expect(data[1]).to eq 80
    expect(data[2]).to eq 80
  end
end
