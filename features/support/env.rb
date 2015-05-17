require 'cucumber/rails'
require File.expand_path('../../../spec/midi_destination', __FILE__)
require File.expand_path('../../../spec/chrome_log_display', __FILE__)

ActionController::Base.allow_rescue = false

FactoryGirl.definition_file_paths = %w(spec/factories)
FactoryGirl.find_definitions

DatabaseCleaner.strategy = :transaction
Cucumber::Rails::Database.javascript_strategy = :transaction

World(FactoryGirl::Syntax::Methods)

Before do |scenario|
  @midi_destination = Test::MidiDestination.instance
end

Capybara.register_driver :capachrome do |app|
  Capybara::Capachrome::Driver.new(app, browser: :chrome, args: ["enable-web-midi"])
end

World(ChromeLogDisplay)

if false #quick and dirty switching between poltergeist and capachrome
  require 'capybara/poltergeist'
  Capybara.javascript_driver = :poltergeist
else
  Capybara.javascript_driver = :capachrome
end
