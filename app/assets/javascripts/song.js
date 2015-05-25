window.Song = {};

Song.addNote = function(songState) {
  songState["song"]["notes"].push({beats: 0, pitch: 1});
  return songState;
}

Song.play = function(songState) {
  SCHEDULE_DELAY_TIME = 1000;
  bpm = songState.song.tempo;
  seconds_per_tick = 60 / (96.0 * bpm);

  for(var note of songState.song.notes) {
    note_length_in_millis = note.ticks * (seconds_per_tick * 1000)
    Midi.sendOn(1, note.pitch, 80, 0 + SCHEDULE_DELAY_TIME);
    offTime = note_length_in_millis + SCHEDULE_DELAY_TIME;
    Midi.sendOff(1, note.pitch, 80, offTime);
  }

  return songState;
}

Song.newSong = function(songState) {
  songState.song = {tempo: 60, notes: []};
  return songState;
}

Song.setProperty = function(songState, commandWithArguments) {
  keyValueArg = commandWithArguments.split(" ")[1];
  keyValueArray = keyValueArg.split("=");
  key = keyValueArray[0];
  value = keyValueArray[1];
  songState.song[key] = value;
  return songState;
}
