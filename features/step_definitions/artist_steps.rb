Given /^a signed in artist with a song$/ do
  steps %Q{
    Given a user with songs
    When I am on the signin page
    And  I provide credentials
    And  I click a song
  }
end

Given /^a signed in artist with a song with two notes$/ do
  create :user, :with_a_song_with_two_notes

  steps %Q{
    When I am on the signin page
    And  I provide credentials
    And  I click a song
  }
end

Given(/^there is a midi output available$/) do
  # result = page.evaluate_script("Midi.connect();")
  sleep(0.05) #connect is async, takes a small amount of time!
end

When(/^I set the tempo very high in order to shrink the test$/) do
  command = ":set tempo=6000"

  command.chars.each do |char|
    page.execute_script("EVENT_TRIGGERS.downKey('#{char}')")
  end

  page.execute_script("EVENT_TRIGGERS.downKey('\\r')")
end

When(/^I type the "(.*)" command$/) do |command|
  command.chars.each do |char|
    page.execute_script("EVENT_TRIGGERS.downKey('#{char}')")
  end

  page.execute_script("EVENT_TRIGGERS.downKey('\\r')")
end

Then /^I hear the song \(via midi\)$/ do
  @midi_destination.collect()
  @midi_destination.expect(2)
  packets = @midi_destination.finish()
  expect(packets.count).to eq 2

  on_message = packets.first
  off_message = packets.second
  note_length = off_message[:timestamp] - on_message[:timestamp]

  expect(note_length.round).to eq 10

  expect_midi_message(on_message, on = 9, 1, 64, 80)
  expect_midi_message(off_message, off = 8, 1, 64, 80)
end

Then /^I hear the song with two notes$/ do
  @midi_destination.collect()
  @midi_destination.expect(4)
  display_logs
  packets = @midi_destination.finish()
  expect(packets.count).to eq 4

  on_message = packets.first
  off_message = packets.second
  note_length = off_message[:timestamp] - on_message[:timestamp]

  expect(note_length.round).to eq 10

  expect_midi_message(on_message, on = 9, 1, 64, 80)
  expect_midi_message(off_message, off = 8, 1, 64, 80)

  on_message = packets[2]
  off_message = packets[3]
  note_length = off_message[:timestamp] - on_message[:timestamp]

  expect(note_length.round).to eq 10

  expect_midi_message(on_message, on = 9, 1, 64, 80)
  expect_midi_message(off_message, off = 8, 1, 64, 80)
end
