window.CursorMovement = {}

function moveCursor(viewState, attrs) {
  var viewState = ViewState.setCursor(viewState, attrs);

  if (viewState.mode === 'visual') {
    ViewState.activePartView(viewState).visuallySelectedNotes = ViewState.selectedNotes(viewState, State.song());
  }

  return viewState;
}

CursorMovement.moveCursor = moveCursor;

CursorMovement.moveDown = function(viewState, number) {
  var pitches = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {pitch: cursor['pitch'] - pitches})
  return viewState;
}

CursorMovement.moveUp = function(viewState, number) {
  var pitches = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {pitch: cursor['pitch'] + pitches})
  return viewState;
}

CursorMovement.moveRight = function(viewState, number) {
  var beats = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {start: cursor['start'] + (96 * beats)})
  return viewState;
}

CursorMovement.moveLeft = function(viewState, number) {
  var beats = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {start: cursor['start'] - (96 * beats)})
  return viewState;
}

CursorMovement.ensureCursorInBounds = function(viewState) {
  var cursor = ViewState.activeCursor(viewState);
  var numberOfBeatsInPart = SongState.activePart().beats * 96

  if (cursor.start >= numberOfBeatsInPart) {
    moveCursor(viewState, {start: numberOfBeatsInPart})
  }

  return viewState;
}

CursorMovement.moveToNextNote = function(viewState) {
  var notes = SongState.currentPartNotes()

  var cursor = ViewState.activeCursor(viewState);

  var filterFn = function(note) {
    return note.start > cursor['start'] ||
      ( note.pitch < cursor['pitch'] && note.start === cursor['start'] );
  }

  var nextNote = notes.filter(filterFn)[0];

  if(nextNote) {
    cursor['start'] = nextNote.start;
    cursor['pitch'] = nextNote.pitch;
  }
  return viewState;
}

CursorMovement.moveToPrevNote = function(viewState) {
  var notes = SongState.currentPartNotes();

  const cursor = ViewState.activeCursor(viewState);

  var filterFn = function(note) {
    return note.start < cursor['start'] ||
      ( note.pitch > cursor['pitch'] && note.start === cursor['start'] );
  }

  var notesAfterCursor = notes.filter(filterFn);

  var nextNote = notesAfterCursor[notesAfterCursor.length - 1];

  if(nextNote) {
    viewState = moveCursor(viewState, nextNote);
  }

  return viewState;
}

CursorMovement.moveToTop = function(viewState) {
  viewState = moveCursor(viewState, {pitch: 127});
  return viewState;
}

CursorMovement.moveToBottom = function(viewState) {
  viewState = moveCursor(viewState, {pitch: 0});
  return viewState;
}

CursorMovement.moveToZero = function(viewState) {
  viewState = moveCursor(viewState, {start: 0});
  return viewState;
}

CursorMovement.moveToSelection = function(viewState) {
  var notes = Selection.getSelectedNotes(State.song());

  var sortedNotes = notes.concat().sort(function(a, b) { return a.pitch - b.pitch });
  var noteToEmulate = sortedNotes[0];

  if (noteToEmulate) {
    viewState = moveCursor(viewState, noteToEmulate);
  }

  return viewState;
}

CursorMovement.moveToEnd = function(viewState) {
  var part = SongState.activePart();
  viewState = moveCursor(viewState, {start: part.beats * 96});
  return viewState;
}
