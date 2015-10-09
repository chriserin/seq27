window.Delete = {}

Delete.deleteLatest = function(songState) {
  var notes = SongState.currentGroupNotes(songState)
  var part = SongState.activePart()

  for (var note of notes) {
    var index = SongState.indexOfNote(note, part)
    delete part.notes[index];
  }

  part.notes = part.notes.filter(function(n) { return n;})
  return songState;
}

Delete.deleteSelected = function(songState) {
  var notes = ViewState.selectedNotes(songState)

  var part = SongState.activePart()

  for (var note of notes) {
    var index = SongState.indexOfNote(note, part)
    delete part.notes[index];
  }

  part.notes = part.notes.filter(function(n) { return n;})

  return songState;
}
