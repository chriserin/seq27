window.Chord = {}

Chord.major = function(songState, viewState) {
  var activePart = SongState.activePart(songState, viewState);
  var part = createChord([0,4,7], activePart, viewState);

  return songState;
}

Chord.minor = function(songState, viewState) {
  var activePart = SongState.activePart(songState, viewState);
  var part = createChord([0,3,7], activePart, viewState);

  return songState;
}

var createChord = function(chordPattern, part, viewState) {
  var cursor = ViewState.activeCursor(viewState);

  var newNotes = chordPattern.map(function(interval) {
    return SongState.newNote(cursor.start, cursor.pitch + interval, 96);
  })

  SongState.tagNotes(newNotes);

  Array.prototype.push.apply(part.notes, newNotes);

  return part;
}
