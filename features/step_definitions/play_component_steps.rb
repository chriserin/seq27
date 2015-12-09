
Then /^I hear only the current part$/ do
  @midi_destination.collect()
  @midi_destination.expect(2)
  packets = @midi_destination.finish()
  expect(packets.count).to eq 2

  on_packets = packets.select {|p| p[:data][0] == 145}
  expect(on_packets.count).to(eq(1), "Got #{on_packets.count} on packets but expected 1")

  on_message = packets.first
  off_message = packets.second
  note_length = off_message[:timestamp] - on_message[:timestamp]

  expect(note_length.round).to eq 10

  expect_midi_message(on_message, on = 9, 1, 60, 80)
  expect_midi_message(off_message, off = 8, 1, 60, 80)
end
