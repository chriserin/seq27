window.Elastic = {};

Elastic.squeeze = function(songState) {

  const notes = Selection.getSelectedNotes(songState);
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start});
  const anchorStart = sortedNotes[0].start;

  for(let i = 0; i < sortedNotes.length; i++) {
    sortedNotes[i].length /= 2;
    sortedNotes[i].start = ((sortedNotes[i].start - anchorStart) / 2) + anchorStart;
  }

  return songState;
}
