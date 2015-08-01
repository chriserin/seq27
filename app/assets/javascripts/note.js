window.Note = {}

Note.doubleLength = function(songState) {
  note = SongState.currentNote(songState)
  note['note']['length'] = note['note']['length'] * 2
  return songState;
}

Note.halveLength = function(songState) {
  note = SongState.currentNote(songState)
  note['note']['length'] = note['note']['length'] / 2
  return songState;
}

Note.deleteLatest = function(songState) {
  note = SongState.currentNote(songState)
  parent = note['parent']
  index = SongState.indexOfNote(note['note'], parent)
  delete parent.notes[index];
  return songState;
}
