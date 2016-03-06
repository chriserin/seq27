
Then(/^I see a "(.*?)" major scale$/) do |root_pitch|
  pitch_map = {"c" => 60, "a" => 69}
  root_number = pitch_map[root_pitch.downcase]
  [0, 2, 4, 5, 7, 9, 11, 12].each do |interval|
    expect_note_at(root_number + interval)
  end
end

Then(/^I see a "(.*?)" minor scale$/) do |root_pitch|
  pitch_map = {"c" => 60, "a" => 69}
  root_number = pitch_map[root_pitch.downcase]

  # Natural Minor: WHWWHWW
  [0, 2, 3, 5, 7, 8, 10, 12].each do |interval|
    expect_note_at(root_number + interval)
  end
end
