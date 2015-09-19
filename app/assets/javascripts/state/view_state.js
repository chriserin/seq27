VIEW_STATE = {
  mode: 'normal',
  cursor: {
    pitch: 127,
    start: 0,
    length: 96
  },
  anchorCursor: {
    pitch: -1,
    start: -1,
    length: -1
  },
  explorerCursor: {
    arrangementIndex: 0,
    partId: 0
  },
  activeSection: 0,
  activePart: 0,
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

ViewState.selectedNotes = function(songState){
  var part = SongState.activePart()

  var anchorCursor = VIEW_STATE['anchorCursor']
  var cursorCursor = VIEW_STATE['cursor']

  var leftEdge = Math.min(anchorCursor.start, cursorCursor.start)
  var rightEdge = Math.max(anchorCursor.start + anchorCursor.length, cursorCursor.start + cursorCursor.length)
  var topPitch = Math.max(anchorCursor.pitch, cursorCursor.pitch)
  var bottomPitch = Math.min(anchorCursor.pitch, cursorCursor.pitch)

  var notesSelectedOnBeatsAxis = part.notes.filter(function(note) {
    return ((note.start + note.length - 1) >= leftEdge && note.start < rightEdge)
  })

  var selectedNotes = notesSelectedOnBeatsAxis.filter(function(note) {
    return (note.pitch <= topPitch && note.pitch >= bottomPitch);
  })

  return selectedNotes
}
