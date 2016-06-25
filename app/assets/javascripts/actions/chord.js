window.Chord = {}

Chord.major = function(songState) {
  var activePart = SongState.activePart(songState);
  var part = createChord([0,4,7], activePart);

  return songState;
}

Chord.minor = function(songState) {
  var activePart = SongState.activePart(songState);
  var part = createChord([0,3,7], activePart);

  return songState;
}

var createChord = function(chordPattern, part) {
  var cursor = ViewState.activeCursor(State.view());

  var newNotes = chordPattern.map(function(interval) {
    return SongState.newNote(cursor.start, cursor.pitch + interval, 96);
  })

  SongState.tagNotes(newNotes);

  Array.prototype.push.apply(part.notes, newNotes);

  return part;
}
