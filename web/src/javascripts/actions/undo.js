window.Undo = {}

//Modifies both view and song state
Undo.undo = function uu(songState, viewState, number) {
  var undoTimes = number || 1;

  var pointer = ViewState.activePointer(viewState);

  if(undoTimes <= pointer) {
    pointer -= undoTimes;

    var version = ViewState.activeStack(viewState)[pointer];

    ViewState.activePartView(viewState).stackPointer = pointer;

    SongState.replaceActivePart(songState, version.toJS());
  }

  return songState;
}

//Modifies both view and song state
Undo.redo = function ur(songState, viewState) {
  var pointer = ViewState.activePointer(viewState) + 1;

  if (pointer < ViewState.activeStack(viewState).length) {
    var version = ViewState.activeStack(viewState)[pointer];
    ViewState.activePartView(viewState).stackPointer = pointer;
    SongState.replaceActivePart(songState, version.toJS());
  }

  return songState;
}

Undo.initActiveStack = function ias(viewState, songState) {

  var currentState = SongState.activePart(songState, viewState);
  ViewState.activePartView(viewState).stackPointer = 0;
  ViewState.activeStack(viewState).push(Immutable.fromJS(currentState));

  return viewState;
}

Undo.initStack = function ias(viewState, songState, sectionIndex, partIndex) {

  const currentState = SongState.activePart(songState, viewState);
  const partState = songState.sections[sectionIndex].parts[partIndex];
  const partViewState = viewState.sections[sectionIndex].parts[partIndex];

  partViewState.stackPointer = 0;
  partViewState.stack.push(Immutable.fromJS(currentState));

  return viewState;
}

var metaAttributes = {isUndoFunction: true};

Undo.redo.prototype = metaAttributes;
Undo.undo.prototype = metaAttributes;
