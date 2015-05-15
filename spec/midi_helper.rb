require 'coremidi'
require 'coremidi/virtual_destination'
require 'midi_destination'

Capybara.register_driver :capachrome do |app|
  Capybara::Capachrome::Driver.new(app, browser: :chrome, args: ["enable-web-midi"])
end

Capybara.default_driver = :capachrome

module ChromeLogDisplay
  def display_logs
    browser_messages = page.driver.getLog(:browser)
    puts browser_messages.reject {|x| x =~ /Download the React DevTools/}
  end
end

RSpec.configure do |c|
  c.include ChromeLogDisplay
end
