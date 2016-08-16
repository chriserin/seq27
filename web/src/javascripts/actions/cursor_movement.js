window.CursorMovement = {}

function moveCursor(viewState, attrs) {
  var viewState = ViewState.setCursor(viewState, attrs);

  if (viewState.mode === 'visual') {
    ViewState.activePartView(viewState).visuallySelectedNotes = ViewState.selectedNotes(viewState, State.song());
  }

  return viewState;
}

CursorMovement.moveCursor = moveCursor;

CursorMovement.moveDown = function(viewState, _, number) {
  var pitches = number || 1;
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {pitch: cursor['pitch'] - pitches});
  return viewState;
}

CursorMovement.moveUp = function(viewState, _, number) {
  var pitches = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {pitch: cursor['pitch'] + pitches})
  return viewState;
}

CursorMovement.moveRight = function(viewState, _, number) {
  var beats = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {start: cursor['start'] + (96 * beats)})
  return viewState;
}

CursorMovement.moveLeft = function(viewState, _, number) {
  var beats = number || 1
  var cursor = ViewState.activeCursor(viewState);
  moveCursor(viewState, {start: cursor['start'] - (96 * beats)})
  return viewState;
}

CursorMovement.ensureCursorInBounds = function(viewState, songState) {
  var cursor = ViewState.activeCursor(viewState);
  var numberOfBeatsInPart = SongState.activePart(songState).beats * 96;

  if (cursor.start >= numberOfBeatsInPart) {
    moveCursor(viewState, {start: numberOfBeatsInPart});
  }

  return viewState;
}

CursorMovement.moveToNextNote = function(viewState, songState) {
  var notes = SongState.currentPartNotes(songState);

  var cursor = ViewState.activeCursor(viewState);

  var filterFn = function(note) {
    return note.start > cursor['start'] ||
      ( note.pitch < cursor['pitch'] && note.start === cursor['start'] );
  }

  var nextNote = notes.filter(filterFn)[0];

  if(nextNote) {
    viewState = moveCursor(viewState, nextNote);
  }

  return viewState;
}

CursorMovement.moveToPrevNote = function(viewState, songState) {
  var notes = SongState.currentPartNotes(songState);

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

CursorMovement.moveToTop = function(viewState, _) {
  viewState = moveCursor(viewState, {pitch: 127});
  return viewState;
}

CursorMovement.moveToBottom = function(viewState, _) {
  viewState = moveCursor(viewState, {pitch: 0});
  return viewState;
}

CursorMovement.moveToZero = function(viewState, _) {
  viewState = moveCursor(viewState, {start: 0});
  return viewState;
}

CursorMovement.moveToSelection = function(viewState, songState) {
  var notes = Selection.getSelectedNotes(songState);

  var sortedNotes = notes.concat().sort(function(a, b) { return a.pitch - b.pitch });
  var noteToEmulate = sortedNotes[0];

  if (noteToEmulate) {
    viewState = moveCursor(viewState, noteToEmulate);
  }

  return viewState;
}

CursorMovement.moveToEnd = function(viewState, songState) {
  var part = SongState.activePart(songState);
  viewState = moveCursor(viewState, {start: part.beats * 96});
  return viewState;
}
