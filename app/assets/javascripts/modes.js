window.Modes = {};

Modes.commandMode = function (state) {
  state["mode"] = 'command';
  return state;
};

Modes.normalMode = function (state) {
  state["mode"] = 'normal';
  return state;
};
