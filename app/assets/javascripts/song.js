window.Song = {};

Song.addNote = function(songState) {
  songState["song"]["notes"].push({beats: 0, pitch: 1});
  return songState;
}

Song.play = function(songState) {
  for(var note of songState.song.notes) {
    Midi.sendOn(1, note.pitch, 80);
    Midi.sendOff(1, note.pitch, 80);
  }

  return songState;
}
