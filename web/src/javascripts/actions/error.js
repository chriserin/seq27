window.SeqError = {}

SeqError.notACommand = function(viewState, commandBuffer) {
  var message = 'E1: Not an editor command: ' + commandBuffer
  return SeqError.error(viewState, message)
}

SeqError.partDoesNotExist = function(viewState) {
  var message = 'E2: Part does not exist'
  return SeqError.error(viewState, message)
}

SeqError.sectionDoesNotExist = function(viewState) {
  var message = 'E3: Section does not exist'
  return SeqError.error(viewState, message)
}

SeqError.error = function(viewState, message) {
  viewState.delayedAction = function(state) { state.error = ''; return state;}
  viewState.error = message
  return Modes.normalMode(viewState)
}
