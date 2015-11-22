window.Modes = {};

Modes.commandMode = function (viewState) {
  viewState["mode"] = 'command';
  return viewState;
};

Modes.normalMode = function (viewState) {
  viewState["mode"] = 'normal';
  return viewState;
};

Modes.endVisualMode = function (viewState) {
  viewState["mode"] = 'normal';
  viewState.visuallySelectedNotes = null
  return viewState;
};

Modes.endSelectingMode = function (viewState) {
  viewState["mode"] = 'normal';
  return viewState;
};

Modes.visualMode = function (viewState) {
  viewState['anchorCursor'] = JSON.parse(JSON.stringify(viewState['cursor']))
  viewState["mode"] = 'visual';
  viewState.visuallySelectedNotes = ViewState.selectedNotes(SONG_STATE)
  return viewState;
};

Modes.explorerMode = function (viewState) {
  viewState["mode"] = 'explorer';
  return viewState;
};

Modes.transitionToNextMode = function(viewState) {
  var currentMode = viewState['mode']
  var nextMode = currentMode;

  if (currentMode === 'command') {
    nextMode = 'normal'
  } else if (currentMode === 'explorer') {
    nextMode = 'explorer'
  }

  viewState['mode'] = nextMode;

  return viewState
}
