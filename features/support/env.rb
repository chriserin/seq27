require 'cucumber/rails'

ActionController::Base.allow_rescue = false

FactoryGirl.definition_file_paths = %w(spec/factories)
FactoryGirl.find_definitions

DatabaseCleaner.strategy = :transaction
Cucumber::Rails::Database.javascript_strategy = :transaction

World(FactoryGirl::Syntax::Methods)

Capybara.register_driver :capachrome do |app|
  Capybara::Capachrome::Driver.new(app, browser: :chrome, args: ["enable-web-midi"])
end

module ChromeLogDisplay
  def display_logs
    page.driver.getLog(:browser).reject {|x| x =~ /Download the React DevTools/}.each do |message|
      puts message
    end
  end
end

World(ChromeLogDisplay)

if false #quick and dirty switching between poltergeist and capachrome
  require 'capybara/poltergeist'
  Capybara.javascript_driver = :poltergeist
else
  Capybara.javascript_driver = :capachrome
end
