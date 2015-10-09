Then(/^I see that the song is in the database$/) do
  expect(Song.count).to eq 1
  song = Song.last
  expect(song.definition).to be
end
