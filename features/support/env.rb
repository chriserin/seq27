require 'cucumber/rails'

ActionController::Base.allow_rescue = false

FactoryGirl.definition_file_paths = %w(spec/factories)
FactoryGirl.find_definitions

require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist
DatabaseCleaner.strategy = :transaction
Cucumber::Rails::Database.javascript_strategy = :transaction

World(FactoryGirl::Syntax::Methods)
