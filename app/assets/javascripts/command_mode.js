window.CommandMode = {}

CommandMode.commandMapping = function() {
  return {
    "new": [Song.newSong, NOOP],
    "set": [Song.setProperty, NOOP],
    "get": [NOOP, Song.getProperty],
    "throw": [Testing.throwError, NOOP]
  };
}

CommandMode.addToCommandBuffer = function(state, key) {
  if(state["commandBuffer"] === undefined)
    state["commandBuffer"] = [];
  state["commandBuffer"].push(key);
  return state;
}

CommandMode.executeCommandBuffer = function(state) {
  commandBuffer = window.VIEW_STATE["commandBuffer"].join("")
  command = commandBuffer.split(" ")[0]

  cm = CommandMode.commandMapping()
  commandFns = cm[command]

  commandFns[0](SONG_STATE, commandBuffer)
  commandFns[1](VIEW_STATE, commandBuffer)

  clearCommandBuffer();
  return state;
}

var clearCommandBuffer = function(state) {
  window.VIEW_STATE["commandBuffer"] = []
}
