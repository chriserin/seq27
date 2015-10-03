window.Report = {}

Report.outputs = function(viewState) {
  viewState.delayedAction = function(state) { state.reportItems = null; state.reportTitle = ''; return state;}
  viewState.reportItems = Midi.outputNames()
  viewState.reportTitle = ':outputs'
  return viewState
}
