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
end
