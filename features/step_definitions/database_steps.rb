Then(/^I see that the song is in the database$/) do
  expect(Song.count).to eq 2
  song = Song.last
  expect(song.definition).to be
end
