window.Note = {}

Note.doubleLength = function(songState) {
  note = SongState.currentNote(songState)
  note['length'] = note['length'] * 2
  return songState;
}

Note.halveLength = function(songState) {
  note = SongState.currentNote(songState)
  note['length'] = note['length'] / 2
  return songState;
}
