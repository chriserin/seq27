window.Delete = {}

Delete.deleteLatest = function(songState, _) {
  var notes = SongState.currentGroupNotes(songState);
  var part = SongState.activePart(songState);

  for (var note of notes) {
    var index = SongState.indexOfNote(note, part);
    delete part.notes[index];
  }

  part.notes = part.notes.filter(function(n) { return n;});

  return songState;
}

Delete.deleteSelected = function ds(songState, viewState) {
  var notes = ViewState.selectedNotes(viewState, songState);

  var part = SongState.activePart(songState);

  for (var note of notes) {
    var index = SongState.indexOfNote(note, part);
    delete part.notes[index];
  }

  part.notes = part.notes.filter(function(n) { return n;});

  return songState;
}
