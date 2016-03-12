require 'midi_destination'
require 'midi_expectations'
require 'chrome_log_display'

RSpec.configure do |c|
  c.include ChromeLogDisplay
  c.include MidiExpectations
end
