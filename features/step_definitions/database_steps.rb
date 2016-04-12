Then(/^I see that the song is in the database$/) do
  expect(Song.count).to eq 2
  song = Song.last
  expect(song.definition).to be
end

Then(/^I see that the song has a name of "([^"]*)"$/) do |song_name|
  song = Song.last
  expect(song.name).to eq song_name
end
