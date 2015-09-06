VIEW_STATE = {
  mode: 'normal',
  cursor: {
    pitch: 127,
    start: 0,
    length: 96
  },
  explorerCursor: {
    arrangementIndex: 0,
    partId: 1
  },
  activeSection: 0,
  activePart: 1,
  commandResult: '',
  commandBuffer: [],
  explorerDisplayParts: true,
  explorerMode: 'normal',
  selectedArrangementIndexes: []
};

window.ViewState = {}
ViewState.init = function() {
  for (var stateKey in VIEW_STATE) {
    defineProp(stateKey)
  }
}

function defineProp(stateKey) {
  Object.defineProperty(ViewState, stateKey, { get: function() {return VIEW_STATE[stateKey]}})
}
