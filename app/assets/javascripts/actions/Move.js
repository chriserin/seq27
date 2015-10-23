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

Move.moveSelectionLeft = function(songState, number) {
  var ticks = (number * 96) || 96
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.start -= 96
  }

  return songState
}

Move.moveSelectionRight = function(songState, number) {
  var ticks = (number * 96) || 96
  var notes = Selection.getSelectedNotes(songState)

  for (var note of notes) {
    note.start += ticks
  }

  return songState
}
