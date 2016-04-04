window.CursorMovement = {}

function moveCursor(state, attrs) {
  var state = ViewState.setCursor(state, attrs)
  if (state.mode === 'visual') {
    ViewState.activePartView().visuallySelectedNotes = ViewState.selectedNotes(SONG_STATE)
  }
  return state
}

CursorMovement.moveCursor = moveCursor;

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

CursorMovement.ensureCursorInBounds = function(viewState) {
  var cursor = viewState.cursor
  var numberOfBeatsInPart = SongState.activePart().beats * 96

  if (cursor.start >= numberOfBeatsInPart) {
    moveCursor(viewState, {start: numberOfBeatsInPart})
  }

  return viewState;
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
    viewState = moveCursor(viewState, nextNote)
  }
  return viewState;
}

CursorMovement.moveToTop = function(viewState) {
  viewState = moveCursor(viewState, {pitch: 127});
  return viewState
}

CursorMovement.moveToBottom = function(viewState) {
  viewState = moveCursor(viewState, {pitch: 0});
  return viewState
}

CursorMovement.moveToZero = function(viewState) {
  viewState = moveCursor(viewState, {start: 0});
  return viewState
}

CursorMovement.moveToSelection = function(viewState) {
  var notes = Selection.getSelectedNotes(SONG_STATE)
  var sortedNotes = notes.concat().sort(function(a, b) { return a.pitch - b.pitch })
  var noteToEmulate = sortedNotes[0]

  if (noteToEmulate) {
    viewState = moveCursor(viewState, noteToEmulate);
  }

  return viewState
}

CursorMovement.moveToEnd = function(viewState) {
  var part = SongState.activePart();
  viewState = moveCursor(viewState, {start: part.beats * 96});
  return viewState;
}
