require 'coremidi'
require 'coremidi/virtual_destination'


Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome, args: ["enable-web-midi", "console"])
end

Capybara.default_driver = :selenium
