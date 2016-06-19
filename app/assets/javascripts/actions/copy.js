window.Copy = {}

Copy.yank = function(viewState) {

  var selectedNotes = Selection.getSelectedNotes(SONG_STATE)

  var yankedNotes = _.cloneDeep(selectedNotes)

  yankedNotes.sort(function(a, b) {
    return a.start - b.start || a.pitch - b.pitch;
  })

  var rootNote = _.cloneDeep(yankedNotes[0])

  yankedNotes.forEach(function(note) {
    note.start = note.start - rootNote.start
    note.pitch = note.pitch - rootNote.pitch
  })

  viewState.yankedNotes = yankedNotes

  return viewState
}

Copy.paste = function(songState) {
  var cursor = ViewState.activeCursor()

  var notesForPasting = _.cloneDeep(ViewState.yankedNotes)

  notesForPasting.forEach(function(note) {
    note.start = cursor.start + note.start
    note.pitch = cursor.pitch + note.pitch
  })

  SongState.tagNotes(notesForPasting)

  var partNotes = SongState.activePart().notes
  partNotes = partNotes.concat(notesForPasting)
  SongState.activePart().notes = partNotes

  return songState
}
