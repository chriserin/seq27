
def expect_note_at(pitch)
  nodes = all('note')
  pitches = nodes.map {|node| node['data-pitch'] }
  expect(pitches).to include pitch.to_s
end

Then(/^I see a major chord at middle "(.*?)"$/) do |root_pitch|
  pitch_map = {"c" => 60, "a" => 69}
  root_number = pitch_map[root_pitch]
  expect_note_at(root_number)
  expect_note_at(root_number + 4)
  expect_note_at(root_number + 7)
end

Then(/^I see a minor chord at middle "(.*?)"$/) do |root_pitch|
  pitch_map = {"c" => 60}
  root_number = pitch_map[root_pitch]
  expect_note_at(root_number)
  expect_note_at(root_number + 3)
  expect_note_at(root_number + 7)
end
