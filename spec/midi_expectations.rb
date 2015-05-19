module MidiExpectations
  def expect_midi_message(message, exp_message_type, exp_channel, exp_pitch, exp_velocity)
    data = message[:data]
    message_type = data[0] >> 4
    channel = data[0] - (message_type << 4)

    expect(message_type).to eq exp_message_type
    expect(channel).to eq exp_channel
    expect(data[1]).to eq exp_pitch
    expect(data[2]).to eq exp_velocity
  end
end
