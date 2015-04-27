require 'cucumber/rails'

ActionController::Base.allow_rescue = false

FactoryGirl.definition_file_paths = %w(spec/factories)
FactoryGirl.find_definitions

require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist
DatabaseCleaner.strategy = :truncation
Cucumber::Rails::Database.javascript_strategy = :transaction

World(FactoryGirl::Syntax::Methods)

Before('@midi') do |scenario|
  Capybara.current_driver = :selenium
  DatabaseCleaner.strategy = :truncation
end

After do |scenario|
  Capybara.use_default_driver
  DatabaseCleaner.strategy = :truncation
end
