window.Copy = {}

Copy.yank = function(viewState, songState) {

  var selectedNotes = Selection.getSelectedNotes(songState);

  var yankedNotes = _.cloneDeep(selectedNotes);

  yankedNotes.sort(function(a, b) {
    return a.start - b.start || a.pitch - b.pitch;
  });

  var rootNote = _.cloneDeep(yankedNotes[0]);

  yankedNotes.forEach(function(note) {
    note.start = note.start - rootNote.start;
    note.pitch = note.pitch - rootNote.pitch;
  })

  viewState.yankedNotes = yankedNotes;

  return viewState;
}

Copy.paste = function(songState, viewState) {
  const cursor = ViewState.activeCursor(viewState);

  const notesForPasting = _.cloneDeep(ViewState.yankedNotes);

  notesForPasting.forEach(function(note) {
    note.start = cursor.start + note.start;
    note.pitch = cursor.pitch + note.pitch;
  });

  SongState.tagNotes(notesForPasting);

  let partNotes = SongState.activePart(songState, viewState).notes;
  partNotes = partNotes.concat(notesForPasting);
  SongState.activePart(songState, viewState).notes = partNotes;

  return songState;
}
