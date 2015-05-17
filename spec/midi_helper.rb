require 'midi_destination'
require 'chrome_log_display'

Capybara.register_driver :capachrome do |app|
  Capybara::Capachrome::Driver.new(app, browser: :chrome, args: ["enable-web-midi"])
end

Capybara.default_driver = :capachrome

RSpec.configure do |c|
  c.include ChromeLogDisplay
end
