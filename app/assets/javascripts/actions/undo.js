window.Undo = {}

//Modifies both view and song state
Undo.undo = function(songState, number) {
  var undoTimes = number || 1;

  var pointer = ViewState.activePointer(State.view());

  if(undoTimes <= pointer) {
    pointer -= undoTimes;

    var version = ViewState.activeStack(State.view())[pointer];

    ViewState.activePartView(State.view()).stackPointer = pointer;

    SongState.replaceActivePart(songState, version.toJS());
  }

  return songState;
}

//Modifies both view and song state
Undo.redo = function(songState) {
  var pointer = ViewState.activePointer(State.view()) + 1;

  if (pointer < ViewState.activeStack(State.view()).length) {
    var version = ViewState.activeStack(State.view())[pointer];
    ViewState.activePartView(State.view()).stackPointer = pointer;
    SongState.replaceActivePart(songState, version.toJS());
  }

  return songState;
}

Undo.initActiveStack = function(viewState) {

  var currentState = SongState.activePart(State.song());
  ViewState.activePartView(viewState).stackPointer = 0;
  ViewState.activeStack(viewState).push(Immutable.fromJS(currentState));

  return viewState;
}

var metaAttributes = {isUndoFunction: true}

Undo.redo.prototype = metaAttributes
Undo.undo.prototype = metaAttributes
