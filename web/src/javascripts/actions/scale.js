window.Scale = {scales: {}};

//modes
Scale.scales.ionian = Scale.scales.major = [0, 2, 4, 5, 7, 9, 11, 12];
Scale.scales.dorian = [0, 2, 3, 5, 7, 9, 10, 12];
Scale.scales.phrygian = [0, 1, 3, 5, 7, 8, 10, 12];
Scale.scales.lydian = [0, 2, 4, 6, 7, 9, 11, 12];
Scale.scales.mixolydian = [0, 2, 4, 5, 7, 9, 10, 12];
Scale.scales.aeolian = Scale.scales.minor = [0, 2, 3, 5, 7, 8, 10, 12];
Scale.scales.locrian = [0, 1, 3, 5, 6, 8, 10, 12];

//what
Scale.scales.whole = [0, 2, 4, 6, 8, 10, 12];

Scale.create = function(songState, viewState, scaleType='major') {
  var part = SongState.activePart(songState);
  part = createScale(viewState, Scale.scales[scaleType], part);

  return songState;
}

var createScale = function(viewState, pattern, part) {
  var cursor = ViewState.activeCursor(viewState);
  var nextPosition = cursor.start;

  var noteLength = 96;

  var newNotes = pattern.map(function(interval) {
    var note = SongState.newNote(nextPosition, cursor.pitch + interval, noteLength);
    nextPosition += 96;
    return note;
  })

  SongState.tagNotes(newNotes);

  Array.prototype.push.apply(part.notes, newNotes);

  return part;
}
