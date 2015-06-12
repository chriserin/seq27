source 'https://rubygems.org'

ruby '2.2.2'

#FRAMEWORK
gem 'rails', '4.2.0'
gem 'authem'

#DB
gem 'pg'

#FRONT END
gem 'coffee-script'
gem 'react-rails'
gem 'haml'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'jasmine-rails'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'web-console', '~> 2.0'
end

group :test do
  gem 'database_cleaner'
  gem 'rspec-rails'
  gem 'factory_girl'
  gem 'cucumber-rails', require: false
  gem 'poltergeist'
  #gem 'capachrome', path: '~/oss/capachrome'
  gem 'capachrome', github: "chriserin/capachrome"

  #MIDI
  gem "ffi-coremidi", github: "chriserin/ffi-coremidi", branch: "virtual-destination"
end
