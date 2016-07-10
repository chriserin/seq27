window.Elastic = {};

Elastic.squeeze = function(songState, _) {
  const notes = Selection.getSelectedNotes(songState);
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start});
  const anchorStart = sortedNotes[0].start;

  for(let i = 0; i < sortedNotes.length; i++) {
    sortedNotes[i].length /= 2;
    sortedNotes[i].start = ((sortedNotes[i].start - anchorStart) / 2) + anchorStart;
  }

  return songState;
}

Elastic.stretch = function(songState, _) {
  const notes = Selection.getSelectedNotes(songState);
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start});
  const anchorStart = sortedNotes[0].start;

  for(let i = 0; i < sortedNotes.length; i++) {
    sortedNotes[i].length *= 2;
    sortedNotes[i].start = ((sortedNotes[i].start - anchorStart) * 2) + anchorStart;
  }

  return songState;
}

Elastic.fill = function(songState, _) {
  const notes = Selection.getSelectedNotes(songState);
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start});
  const anchorStart = sortedNotes[0].start;

  for(let i = 0; i < sortedNotes.length; i++) {
    if (sortedNotes[i+1])
      sortedNotes[i].length = sortedNotes[i+1].start - sortedNotes[i].start;
  }

  return songState;
}

Elastic.compact = function(songState, _) {
  const notes = Selection.getSelectedNotes(songState);
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start});
  const anchorStart = sortedNotes[0].start;

  for(let i = 0; i < sortedNotes.length; i++) {
    let previousNote = sortedNotes[i - 1];

    if (previousNote) {
      sortedNotes[i].start = previousNote.length + previousNote.start;
    }
  }

  return songState;
}
