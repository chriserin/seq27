require 'coremidi'
require 'coremidi/virtual_destination'

Capybara.register_driver :capachrome do |app|
  Capybara::Capachrome::Driver.new(app, browser: :chrome, args: ["enable-web-midi"])
end

Capybara.default_driver = :capachrome

