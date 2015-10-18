window.Note = {}

Note.doubleLength = function(songState) {
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note['length'] = note['length'] * 2
  }
  return songState;
}

Note.halveLength = function(songState) {
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note['length'] = note['length'] / 2
  }
  return songState;
}
