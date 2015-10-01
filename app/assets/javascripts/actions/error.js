window.Error = {}

Error.notACommand = function(viewState, commandBuffer) {
  viewState.delayedAction = function(state) { state.error = ''; return state;}
  viewState.error = 'E1: Not an editor command: ' + commandBuffer
  return Modes.normalMode(viewState)
}
