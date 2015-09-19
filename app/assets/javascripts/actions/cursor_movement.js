window.CursorMovement = {}

CursorMovement.moveDown = function(state, number) {
  var pitches = number || 1
  state['cursor']['pitch'] -= pitches;
  return state;
}

CursorMovement.moveUp = function(state, number) {
  var pitches = number || 1
  state['cursor']['pitch'] += pitches;
  return state;
}

CursorMovement.moveRight = function(state, number) {
  var beats = number || 1
  state['cursor']['start'] += (96 * beats);
  return state;
}

CursorMovement.moveLeft = function(state, number) {
  var beats = number || 1
  state['cursor']['start'] -= (96 * beats);
  return state;
}

CursorMovement.moveToNextNote = function(viewState) {
  var notes = SongState.currentPartNotes()

  var filterFn = function(note) {
    return note.start > viewState['cursor']['start'] ||
      ( note.pitch < viewState['cursor']['pitch'] && note.start === viewState['cursor']['start'] )
  }

  var nextNote = notes.filter(filterFn)[0]

  viewState['cursor']['start'] = nextNote.start;
  viewState['cursor']['pitch'] = nextNote.pitch;
  return viewState;
}

CursorMovement.moveToPrevNote = function(viewState) {
  var notes = SongState.currentPartNotes()

  var filterFn = function(note) {
    return note.start < viewState['cursor']['start'] ||
      ( note.pitch > viewState['cursor']['pitch'] && note.start === viewState['cursor']['start'] )
  }

  var notesAfterCursor = notes.filter(filterFn)

  var nextNote = notesAfterCursor[notesAfterCursor.length - 1]

  viewState['cursor']['start'] = nextNote.start;
  viewState['cursor']['pitch'] = nextNote.pitch;
  return viewState;
}
