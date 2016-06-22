window.Undo = {}

//Modifies both view and song state
Undo.undo = function(songState, number) {
  var undoTimes = number || 1;

  var pointer = ViewState.activePointer(State.view());

  if(undoTimes <= pointer) {
    pointer -= undoTimes;

    var version = ViewState.activeStack(State.view())[pointer];

    ViewState.activePartView(State.view()).stackPointer = pointer;

    SongState.replaceActivePart(version.toJS());
  }

  return songState;
}

//Modifies both view and song state
Undo.redo = function(songState) {
  var pointer = ViewState.activePointer(State.view()) + 1;

  if (pointer < ViewState.activeStack(State.view()).length) {
    var version = ViewState.activeStack(State.view())[pointer];
    ViewState.activePartView(State.view()).stackPointer = pointer;
    SongState.replaceActivePart(version.toJS());
  }

  return songState;
}

Undo.initActiveStack = function(songState) {

  var currentState = SongState.activePart();
  ViewState.activePartView(State.view()).stackPointer = 0;
  ViewState.activeStack(State.view()).push(Immutable.fromJS(currentState));

  return songState;
}

var metaAttributes = {isUndoFunction: true}

Undo.redo.prototype = metaAttributes
Undo.undo.prototype = metaAttributes
