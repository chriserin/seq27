require 'cucumber/rails'
require File.expand_path('../../../spec/midi_destination', __FILE__)
require File.expand_path('../../../spec/chrome_log_display', __FILE__)
require File.expand_path('../../../spec/midi_expectations', __FILE__)

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
World(MidiExpectations)

World(Module.new do
  def cursor
    page.find('#song cursorGrid cursor')
  end
end)

if false #quick and dirty switching between poltergeist and capachrome
  require 'capybara/poltergeist'
  Capybara.javascript_driver = :poltergeist
else
  Capybara.javascript_driver = :capachrome
end

require 'rspec/expectations'

RSpec::Matchers.define :have_a_position_of do |start, pitch|
  match do |cursor|
    pitch_eq(cursor, pitch) &&
    start_eq(cursor, start)
  end

  def pitch_eq(cursor, pitch)
    cursor['data-pitch'].to_i == pitch.to_i
  end

  def start_eq(cursor, start)
    cursor['data-start'].to_i == start.to_i
  end

  failure_message do |cursor|
    message = ""
    if !pitch_eq(cursor, pitch)
      message = "cursor is at pitch #{cursor['data-pitch']} instead of #{pitch}"
    end

    if !start_eq(cursor, start)
      message = "cursor is at start #{cursor['data-start']} instead of #{start}"
    end
    message
  end
end
