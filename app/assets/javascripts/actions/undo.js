window.Undo = {}

Undo.undo = function(songState, number) {
  var undoTimes = number || 1
  var as = ViewState.activeSection
  var ap = ViewState.activePart

  var pointer = VIEW_STATE.sections[as].parts[ap].stackPointer

  if(undoTimes <= pointer) {
    pointer -= undoTimes

    var version = VIEW_STATE.sections[as].parts[ap].stack[pointer]
    songState.sections[as].parts[ap] = version.toJS()

    VIEW_STATE.sections[as].parts[ap].stackPointer = pointer
  }

  return songState
}

Undo.redo = function(songState) {
  var as = ViewState.activeSection
  var ap = ViewState.activePart

  var pointer = ++VIEW_STATE.sections[as].parts[ap].stackPointer
  var version = VIEW_STATE.sections[as].parts[ap].stack[pointer]
  songState.sections[as].parts[ap] = version.toJS()

  return songState
}

Undo.initActiveStack = function(songState) {
  var as = ViewState.activeSection
  var ap = ViewState.activePart

  var currentState = songState.sections[as].parts[ap]
  VIEW_STATE.sections[as].parts[ap].stackPointer = 0
  VIEW_STATE.sections[as].parts[ap].stack.push(currentState)

  return songState
}

var metaAttributes = {isUndoFunction: true}

Undo.redo.prototype = metaAttributes
Undo.undo.prototype = metaAttributes
