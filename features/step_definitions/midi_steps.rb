Given /^a user on a song page$/ do
  steps %Q{
    Given a user with songs
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page
    When  I click a song
    Then  I am on the song page
  }
end

Then /^midi exists$/ do
  result = page.evaluate_script("Midi")
  expect(result).to be
  result = page.evaluate_script("navigator.requestMIDIAccess")
  expect(result).to be
end

And "I am prying" do
  require 'pry'; binding.pry;
  puts "prying"
end
