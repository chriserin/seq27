require 'rails_helper'

describe 'Arpeggios', type: :feature do
  it 'should create arpeggio' do
    visit '/js_spec'
    result = page.evaluate_script("Arpeggio.createArpeggioPattern()")
    expect(result).to eq [0,2,4]
  end

  it 'should create minor arpeggio down' do
    visit '/js_spec'
    result = page.evaluate_script("Arpeggio.createArpeggioPattern('minor', '123', 'd')")
    expect(result).to eq [3,2,0]
  end

  it 'should create minor arpeggio down up' do
    visit '/js_spec'
    result = page.evaluate_script("Arpeggio.createArpeggioPattern('minor', '123', 'du')")
    expect(result).to eq [3,2,0,0,2,3]
  end
end
