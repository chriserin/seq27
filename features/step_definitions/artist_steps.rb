Given /^a signed in artist with a song$/ do
  steps %Q{
    Given a user with songs
    When I am on the signin page
    And  I provide credentials
    And  I click a song
  }
end

Given(/^there is a midi output available$/) do
  # result = page.evaluate_script("Midi.connect();")
  sleep(0.05) #connect is async, takes a small amount of time!
end

Then /^I hear the song \(via midi\)$/ do
  @midi_destination.collect()
  @midi_destination.expect(2)
  packets = @midi_destination.finish()
  expect(packets.count).to eq 2
end
