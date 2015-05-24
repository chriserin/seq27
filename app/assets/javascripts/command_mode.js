window.CommandMode = {}

CommandMode.addToCommandBuffer = function(state, key) {
  if(state["commandBuffer"] === undefined)
    state["commandBuffer"] = [];
  state["commandBuffer"].push(key);
  return state;
}

CommandMode.executeCommandBuffer = function(state) {
  state.song["tempo"] = 6000;
  return state;
}
