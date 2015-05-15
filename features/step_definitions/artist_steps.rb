Given /^a signed in artist with a song$/ do
  steps %Q{
    Given a user with songs
    When I am on the signin page
    And  I provide credentials
    And  I click a song
  }
end


When(/^There is a midi output available$/) do
  pending
end

Then /^I hear the song \(via midi\)$/ do
  pending
end
