window.CommandMode = {}

CommandMode.push = function(key) {
  if (key === "\r") {
    return CommandMode.executionMethods()
  } else if (key === 'ESC') {
    return [NOOP, function(viewState) { return clearCommandBuffer(Modes.normalMode(viewState)) }]
  }

  return [
    NOOP,
    function(state) { return CommandMode.addToCommandBuffer(state, key); }
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

CommandMode.addToCommandBuffer = function(viewState, key) {
  viewState["commandBuffer"].push(key);
  return viewState;
}

CommandMode.removeFromCommandBuffer = function(viewState) {
  if (viewState.commandBuffer.length === 0) {
    return Modes.normalMode(viewState)
  }

  viewState.commandBuffer = viewState.commandBuffer.slice(0, viewState.commandBuffer.length - 1)

  return viewState;
}

CommandMode.executionMethods = function() {
  var commandBuffer = ViewState.commandBuffer.join("")
  var command = commandBuffer.split(" ")[0]

  var commandMapping = CommandMode.commandMapping()
  var commandFns = commandMapping[command]

  if(commandFns === undefined) {
    commandFns = [NOOP, SeqError.notACommand]
  }

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
