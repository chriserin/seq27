

Given(/^a second output named "(.*?)"$/) do |output_name|
  @second_midi_destination = Test::MidiDestination.second_instance(output_name)
end

Then(/^I hear a note on the second output$/) do
  @second_midi_destination.collect()
  @second_midi_destination.expect(2)
  packets = @second_midi_destination.finish()
  expect(packets.count).to eq 2

  on_packets = packets.select {|p| (p[:data][0] >> 4) == 9}

  expect_midi_message(on_packets[0], on = 9, 1, 60, 80)
end
