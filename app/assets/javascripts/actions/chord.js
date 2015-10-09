window.Chord = {}

Chord.major = function(songState) {
  cursor = ViewState.cursor
  results = []
  var activePart = SongState.activePart()
  var newNote = SongState.newNote(cursor.start, cursor.pitch, 96)
  results.push(newNote)
  activePart.notes.push(newNote)
  newNote = SongState.newNote(cursor.start, cursor.pitch + 4, 96)
  results.push(newNote)
  activePart.notes.push(newNote)
  newNote = SongState.newNote(cursor.start, cursor.pitch + 7, 96)
  results.push(newNote)
  activePart.notes.push(newNote)
  SongState.tagNotes(results)
  return songState;
}
