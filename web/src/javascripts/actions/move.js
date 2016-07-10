window.Move = {}

Move.toMiddleNote = function(viewState, note, octave) {
  octave = octave || 5;
  const convertedPitch = note % 12 + octave * 12;
  ViewState.activeCursor(viewState)['pitch'] = convertedPitch;
  return viewState;
}

Move.upOctave = function(viewState) {
  var tmpPitch = ViewState.activeCursor(viewState)['pitch'] + 12;
  viewState = CursorMovement.moveCursor(viewState, {pitch: tmpPitch})
  return viewState;
}

Move.downOctave = function(viewState) {
  var tmpPitch = ViewState.activeCursor(viewState)['pitch'] - 12;
  viewState = CursorMovement.moveCursor(viewState, {pitch: tmpPitch})
  return viewState;
}

Move.upToNote = function(viewState, note) {
  const noteDiff = note % 12;
  const cursor = ViewState.activeCursor(viewState)
  const currentNoteDiff = cursor['pitch'] % 12;
  let tmpPitch = null;

  if (noteDiff > currentNoteDiff)
    tmpPitch = cursor['pitch'] + noteDiff - currentNoteDiff;
  else
    tmpPitch = cursor['pitch'] + (noteDiff - currentNoteDiff) + 12;

  viewState = CursorMovement.moveCursor(viewState, {pitch: tmpPitch});
  return viewState;
}

Move.downToNote = function(viewState, note) {
  const noteDiff = note % 12;
  const cursor = ViewState.activeCursor(viewState);
  const currentNoteDiff = cursor['pitch'] % 12;

  let tmpPitch = null;

  if (noteDiff > currentNoteDiff)
    tmpPitch = cursor['pitch'] + (noteDiff - currentNoteDiff) - 12;
  else
    tmpPitch = cursor['pitch'] + (noteDiff - currentNoteDiff);

  viewState = CursorMovement.moveCursor(viewState, {pitch: tmpPitch});

  return viewState;
}

Move.moveSelectionDown = function(songState, viewState, number) {
  var pitches = number || 1;
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    note.pitch -= pitches;
  }

  return songState;
}

Move.moveSelectionUp = function(songState, viewState, number) {
  var pitches = number || 1
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    note.pitch += pitches;
  }

  return songState;
}

Move.moveSelectionLeft = function(songState, viewState, number, tickUnitLength) {
  var tickUnitLength = tickUnitLength || 96;
  var ticks = (number * tickUnitLength) || tickUnitLength;
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    note.start -= ticks;
  }

  return songState;
}

Move.moveSelectionRight = function(songState, viewState, number, tickUnitLength) {
  var tickUnitLength = tickUnitLength || 96;
  var ticks = (number * tickUnitLength) || tickUnitLength;
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    note.start += ticks;
  }

  return songState;
}

Move.moveSelectionSlightlyLeft = function(songState, _, number) {
  var ticks = (number) || 48;
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    note.start -= ticks;
  }

  return songState;
}

Move.moveSelectionSlightlyRight = function(songState, _, number) {
  var ticks = (number) || 48;
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    note.start += ticks;
  }

  return songState;
}

Move.moveSelectionToRightBeat = function(songState, _) {
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    var currentStart = note.start;
    var rightBeat = (96 - (currentStart % 96)) + currentStart;
    note.start = rightBeat;
  }

  return songState;
}

Move.moveSelectionToLeftBeat = function(songState, _) {
  var notes = Selection.getSelectedNotes(songState);

  for (var note of notes) {
    var currentStart = note.start;
    var leftBeat = currentStart - (currentStart % 96);
    note.start = leftBeat;
  }

  return songState;
}
