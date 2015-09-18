window.Modes = {};

Modes.commandMode = function (viewState) {
  viewState["mode"] = 'command';
  return viewState;
};

Modes.normalMode = function (viewState) {
  viewState["mode"] = 'normal';
  return viewState;
};

Modes.visualMode = function (viewState) {
  viewState['anchorCursor'] = JSON.parse(JSON.stringify(viewState['cursor']))
  viewState["mode"] = 'visual';
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
