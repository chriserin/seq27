window.CursorMovement = {}

function moveCursor(state, attrs) {
  var state = ViewState.setCursor(state, attrs)
  if (state.mode === 'visual') {
    state.visuallySelectedNotes = ViewState.selectedNotes(SONG_STATE)
  }
  return state
}

CursorMovement.moveDown = function(state, number) {
  var pitches = number || 1
  moveCursor(state, {pitch: state['cursor']['pitch'] - pitches})
  return state;
}

CursorMovement.moveUp = function(state, number) {
  var pitches = number || 1
  moveCursor(state, {pitch: state['cursor']['pitch'] + pitches})
  return state;
}

CursorMovement.moveRight = function(state, number) {
  var beats = number || 1
  moveCursor(state, {start: state['cursor']['start'] + (96 * beats)})
  return state;
}

CursorMovement.moveLeft = function(state, number) {
  var beats = number || 1
  moveCursor(state, {start: state['cursor']['start'] - (96 * beats)})
  return state;
}

CursorMovement.moveToNextNote = function(viewState) {
  var notes = SongState.currentPartNotes()

  var filterFn = function(note) {
    return note.start > viewState['cursor']['start'] ||
      ( note.pitch < viewState['cursor']['pitch'] && note.start === viewState['cursor']['start'] )
  }

  var nextNote = notes.filter(filterFn)[0]

  if(nextNote) {
    viewState['cursor']['start'] = nextNote.start
    viewState['cursor']['pitch'] = nextNote.pitch
  }
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

  if(nextNote) {
    viewState['cursor']['start'] = nextNote.start
    viewState['cursor']['pitch'] = nextNote.pitch
  }
  return viewState;
}

CursorMovement.moveToTop = function(viewState) {
  viewState = ViewState.setCursorPitch(viewState, 127);
  return viewState
}

CursorMovement.moveToBottom = function(viewState) {
  viewState = ViewState.setCursorPitch(viewState, 0);
  return viewState
}

CursorMovement.moveToZero = function(viewState) {
  viewState = ViewState.setCursorStart(viewState, 0);
  return viewState
}

CursorMovement.moveToSelection = function(viewState) {
  var notes = Selection.getSelectedNotes(SONG_STATE)
  var sortedNotes = notes.concat().sort(function(a, b) { return a.pitch - b.pitch })
  var noteToEmulate = sortedNotes[0]

  if (noteToEmulate) {
    viewState = ViewState.setCursor(viewState, noteToEmulate);
  }

  return viewState
}
