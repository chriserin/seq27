window.CommandMode = {}

CommandMode.push = function(key) {
  if (key === "\r") {
    return CommandMode.executionMethods()
  }

  return [
    NOOP,
    function(state) { CommandMode.addToCommandBuffer(state, key); }
  ];
}

CommandMode.commandMapping = function() {
  return {
    "new": [Song.newSong, NOOP],
    "set": [Song.setProperty, NOOP],
    "get": [NOOP, Song.getProperty],
    "section": [Song.setSection, Song.setActiveSection],
    "part": [Song.setPart, Song.setActivePart],
    "explore": [NOOP, Explore.enterExploreMode],
    "throw": [Testing.throwError, NOOP]
  };
}

CommandMode.addToCommandBuffer = function(state, key) {
  if(state["commandBuffer"] === undefined)
    state["commandBuffer"] = [];
  state["commandBuffer"].push(key);
  return state;
}

CommandMode.executionMethods = function() {
  var commandBuffer = window.VIEW_STATE["commandBuffer"].join("")
  var command = commandBuffer.split(" ")[0]

  var commandMapping = CommandMode.commandMapping()
  var commandFns = commandMapping[command]

  var songStateFn = function (songState) {
    return commandFns[0](songState, commandBuffer)
  }

  var viewStateFn = function (viewState) {
    var state = commandFns[1](viewState, commandBuffer)
    state = Modes.transitionToNextMode(state)
    return clearCommandBuffer(state)
  }

  return [songStateFn, viewStateFn];
}

var clearCommandBuffer = function(viewState) {
  viewState["commandBuffer"] = []
  return viewState
}
