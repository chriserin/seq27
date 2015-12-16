window.Undo = {}

Undo.undo = function(songState, number) {
  var undoTimes = number || 1

  var pointer = ViewState.activePointer()

  if(undoTimes <= pointer) {
    pointer -= undoTimes

    var version = ViewState.activeStack()[pointer]

    SongState.replaceActivePart(version.toJS())

    ViewState.activePartView().stackPointer = pointer
  }

  return songState
}

Undo.redo = function(songState) {
  var pointer = ViewState.activePointer() + 1

  if (pointer < ViewState.activeStack().length) {
    var version = ViewState.activeStack()[pointer]
    SongState.replaceActivePart(version.toJS())
    ViewState.activePartView().stackPointer = pointer
  }

  return songState
}

Undo.initActiveStack = function(songState) {

  var currentState = SongState.activePart()
  ViewState.activePartView().stackPointer = 0
  ViewState.activeStack().push(currentState)

  return songState
}

Undo.normalizeView = function(viewState) {
  viewState = Modes.endVisualMode(viewState)

  viewState = Groups.setSelectedTag(viewState)

  var notes = Selection.getSelectedNotes(SONG_STATE)

  if (notes && notes.length > 0)
    return CursorMovement.moveCursor(viewState, notes[0])
  else
    return viewState
}

var metaAttributes = {isUndoFunction: true}

Undo.redo.prototype = metaAttributes
Undo.undo.prototype = metaAttributes
