require 'rails_helper'
require 'midi_helper'

describe "Midi", type: :feature do
  before(:all) do
    @midi_destination = Test::MidiDestination.instance
  end

  after(:all) do
    @midi_destination.close
  end

  def midi_connect
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05) #connect is async, takes a small amount of time!
  end

  def get_packets(expected_packet_count)
    @midi_destination.expect(expected_packet_count)
    @midi_destination.collect()
    packets = @midi_destination.finish()
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
    sleep(0.05) #Allow the midi api to asychronously collect midi connections
    result = page.evaluate_script("Midi.selectOutput().name")
    expect(result).to eq "seq27-midi-output"
  end

  it 'should find midi output if passed an index' do
    @second_midi_destination = Test::MidiDestination.second_instance('secondIndex')
    sleep 1
    visit '/js_spec'
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05) #Allow the midi api to asychronously collect midi connections
    result = page.evaluate_script("Midi.outputNames()")
    index = result.find_index('secondIndex')
    result = page.evaluate_script("Midi.selectOutput(#{index}).name")
    expect(result).to eq "secondIndex"
  end

  it 'should expose the list of midi outputs' do
    visit '/js_spec'
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05) #Allow the midi api to asychronously collect midi connections
    result = page.evaluate_script("Midi.outputNames();")
    expect(result).to include "seq27-midi-output"
  end

  it 'should send midi signal' do
    visit '/js_spec'
    midi_connect

    page.evaluate_script("Midi.sendOn(1, 80, 80)")

    messages = get_packets(1)

    expect(messages).to be
    expect(messages.count).to eq 1

    expect_midi_message(messages.first, on = 9, 1, 80, 80)
  end

  it 'should send midi off signal' do
    visit '/js_spec'
    midi_connect

    page.evaluate_script("Midi.sendOff(1, 80, 80)")

    messages = get_packets(1)

    expect(messages).to be
    expect(messages.count).to eq 1

    expect_midi_message(messages.first, off = 8, 1, 80, 80)
  end
end
