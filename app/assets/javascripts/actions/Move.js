window.Move = {}

Move.toMiddleNote = function(viewState, note, octave) {
  octave = octave || 5;
  convertedNote = note % 12 + octave * 12;
  viewState['cursor']['pitch'] = convertedNote;
  return viewState;
}

Move.upOctave = function(viewState) {
  viewState['cursor']['pitch'] += 12;
  return viewState;
}

Move.downOctave = function(viewState) {
  viewState['cursor']['pitch'] -= 12;
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
