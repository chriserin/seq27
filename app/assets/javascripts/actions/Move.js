window.Move = {}

Move.toMiddleNote = function(viewState, note, octave) {
  octave = octave || 5;
  convertedNote = note % 12 + octave * 12;
  viewState['cursor']['pitch'] = convertedNote;
  return viewState;
}

Move.upOctave = function(viewState) {
  var tmpPitch = viewState['cursor']['pitch'] + 12;
  viewState = ViewState.setCursorPitch(viewState, tmpPitch);
  return viewState;
}

Move.downOctave = function(viewState) {
  var tmpPitch = viewState['cursor']['pitch'] - 12;
  viewState = ViewState.setCursorPitch(viewState, tmpPitch);
  return viewState;
}

Move.upToNote = function(viewState, note) {
  noteDiff = note % 12;
  currentNoteDiff = viewState['cursor']['pitch'] % 12;
  if (noteDiff > currentNoteDiff)
    viewState['cursor']['pitch'] += noteDiff - currentNoteDiff;
  else
    viewState['cursor']['pitch'] += (noteDiff - currentNoteDiff) + 12;

  return viewState;
}

Move.downToNote = function(viewState, note) {
  noteDiff = note % 12;
  currentNoteDiff = viewState['cursor']['pitch'] % 12;
  if (noteDiff > currentNoteDiff)
    viewState['cursor']['pitch'] += (noteDiff - currentNoteDiff) - 12;
  else
    viewState['cursor']['pitch'] += (noteDiff - currentNoteDiff);
  return viewState;
}

Move.moveSelectionDown = function(songState, number) {
  var pitches = number || 1
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.pitch -= pitches
  }

  return songState
}

Move.moveSelectionUp = function(songState, number) {
  var pitches = number || 1
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.pitch += pitches
  }

  return songState
}

Move.moveSelectionLeft = function(songState, number, tickUnitLength) {
  var tickUnitLength = tickUnitLength || 96
  var ticks = (number * tickUnitLength) || tickUnitLength
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.start -= ticks
  }

  return songState
}

Move.moveSelectionRight = function(songState, number, tickUnitLength) {
  var tickUnitLength = tickUnitLength || 96
  var ticks = (number * tickUnitLength) || tickUnitLength
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.start += ticks
  }

  return songState
}

Move.moveSelectionSlightlyLeft = function(songState, number) {
  var ticks = (number) || 48
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.start -= ticks
  }

  return songState
}

Move.moveSelectionSlightlyRight = function(songState, number) {
  var ticks = (number) || 48
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.start += ticks
  }

  return songState
}

Move.moveSelectionToRightBeat = function(songState) {
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    var currentStart = note.start
    var rightBeat = (96 - (currentStart % 96)) + currentStart
    note.start = rightBeat
  }

  return songState
}

Move.moveSelectionToLeftBeat = function(songState) {
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    var currentStart = note.start
    var leftBeat = currentStart - (currentStart % 96)
    note.start = leftBeat
  }

  return songState
}
