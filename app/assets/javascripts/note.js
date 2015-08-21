window.Note = {}

Note.doubleLength = function(songState) {
  var notes = SongState.currentNotes(songState)
  for (var note of notes) {
    note['length'] = note['length'] * 2
  }
  return songState;
}

Note.halveLength = function(songState) {
  var notes = SongState.currentNotes(songState)

  for (var note of notes) {
    note['length'] = note['length'] / 2
  }
  return songState;
}

Note.deleteLatest = function(songState) {
  var notes = SongState.currentNotes(songState)
  var part = SongState.activePart()
  for (var note of notes) {
    var index = SongState.indexOfNote(note, part)
    delete part.notes[index];
  }
  return songState;
}
