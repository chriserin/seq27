require 'spec_helper'
require 'rails_helper'
require 'midi_helper'

describe "Midi", type: :feature do
  before(:all) do
    @midiDestination = Test::MidiDestination.new
  end

  def midi_connect
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05) #connect is async, takes a small amount of time!
  end

  def get_packets(expected_packet_count)
    @midiDestination.expect(expected_packet_count)
    @midiDestination.collect()
    packets = @midiDestination.finish()
  end

  def expect_midi_message(message, message_type, exp_channel, exp_pitch, exp_velocity)
    data = message[:data]
    message_type = data[0] >> 4
    channel = data[0] - (message_type << 4)

    expect(message_type).to eq message_type
    expect(channel).to eq exp_channel
    expect(data[1]).to eq exp_pitch
    expect(data[2]).to eq exp_velocity
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
    midi_connect

    page.evaluate_script("Midi.sendOn(1, 80, 80)")

    packets = get_packets(1)
    messages = packets.first

    expect(messages).to be
    expect(messages.count).to eq 1

    expect_midi_message(messages.first, on = 9, 1, 80, 80)
  end

  it 'should send midi off signal' do
    visit '/js_spec'
    midi_connect

    page.evaluate_script("Midi.sendOff(1, 80, 80)")

    display_logs
    packets = get_packets(1)
    messages = packets.first

    expect(messages).to be
    expect(messages.count).to eq 1

    expect_midi_message(messages.first, off = 8, 1, 80, 80)
  end
end
