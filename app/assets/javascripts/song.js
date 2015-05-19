window.Song = {};

Song.addNote = function(songState) {
  songState["song"]["notes"].push({beats: 0, pitch: 1});
  return songState;
}

Song.play = function(songState) {
  Midi.sendOn(1, 80, 80);
  Midi.sendOff(1, 80, 80);

  return songState;
}
