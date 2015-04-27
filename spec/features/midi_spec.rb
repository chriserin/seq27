require 'spec_helper'
require 'rails_helper'
require 'midi_helper'

describe "Midi", type: :feature do
  it 'should see Midi object' do
    visit '/js_spec'
    result = page.evaluate_script("Midi")
    expect(result).to be
    result = page.evaluate_script("navigator.requestMIDIAccess")
    expect(result).to be
  end

  it 'should find midi output' do
    vd = CoreMIDI::VirtualDestination.new(1, nil)
    vd.connect("seq27-midi-output")

    visit '/js_spec'
    result = page.evaluate_script("Midi.connect();")
    sleep(0.05)
    result = page.evaluate_script("Midi.output.name")
    expect(result).to eq "seq27-midi-output"
  end
end
