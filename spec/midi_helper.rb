require 'coremidi'
require 'coremidi/virtual_destination'

# vd = CoreMIDI::VirtualDestination.new(1, nil)
# vd.connect

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome, args: ["enable-web-midi"])
end

Capybara.current_driver = :selenium
