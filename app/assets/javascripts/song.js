window.Song = {};

Song.addNote = function(songState) {
  songState["song"]["notes"].push({beats: 0, pitch: 1});
  return songState;
}

Song.play = function(songState) {
  SCHEDULE_DELAY_TIME = 250;
  for(var note of songState.song.notes) {
    Midi.sendOn(1, note.pitch, 80, 0 + SCHEDULE_DELAY_TIME);
    Midi.sendOff(1, note.pitch, 80, 10 + SCHEDULE_DELAY_TIME);
  }

  return songState;
}
