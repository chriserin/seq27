window.Modes = {};

Modes.commandMode = function (viewState) {
  viewState["mode"] = 'command';
  return viewState;
};

Modes.normalMode = function (viewState) {
  viewState["mode"] = 'normal';
  return viewState;
};

Modes.endVisualMode = function evm(viewState) {
  viewState["mode"] = 'normal';
  ViewState.activePartView(viewState).visuallySelectedNotes = null;
  return viewState;
};

Modes.endSelectingMode = function (viewState) {
  viewState["mode"] = 'normal';
  return viewState;
};

Modes.visualMode = function vm(viewState, songState) {
  viewState['anchorCursor'] = JSON.parse(JSON.stringify(ViewState.activeCursor(viewState)));
  viewState["mode"] = 'visual';
  ViewState.activePartView(viewState).visuallySelectedNotes = ViewState.selectedNotes(viewState, songState);
  return viewState;
};

Modes.transitionToNextMode = function(viewState) {
  const currentMode = viewState['mode'];
  let nextMode = currentMode;

  if (currentMode === 'command') {
    nextMode = 'normal';
  }

  viewState['mode'] = nextMode;

  return viewState;
}
