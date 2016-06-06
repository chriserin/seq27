VIEW_STATE = {
  mode: 'normal',
  yankedNotes: [],
  cursor: {
    pitch: 60,
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
  error: null,
  activeSection: 0,
  activePart: 0,
  sections: [{parts: [{selectedTag: null, stack: [], stackPointer: 0, visuallySelectedNotes: null}]}],
  commandResult: '',
  commandBuffer: [],
  commandHistoryIndex: -1,
  explorerDisplayParts: true,
  explorerMode: 'normal',
  selectedArrangementIndexes: [],
  reportItems: null,
  reportTitle: ''
};

window.ViewState = {}

function defineProp(stateKey) {
  Object.defineProperty(ViewState, stateKey, { get: function() {return VIEW_STATE[stateKey]}})
}

ViewState.init = function(songState) {
  for (var stateKey in VIEW_STATE) {
    defineProp(stateKey)
  }

  for(var i = 0; i < songState.sections.length; i++) {
    ViewState.initPartViewForSection(i)
    ViewState.initPartStacksForSection(i)
  }

  return VIEW_STATE;
}

ViewState.initPartViewForSection = function(sectionNumber) {
  for(var j = 0; j < SONG_STATE.sections[sectionNumber].parts.length; j++) {
    var partView = VIEW_STATE.sections[sectionNumber].parts[j];

    if (typeof partView === 'undefined') {
      VIEW_STATE.sections[sectionNumber].parts[j] = ViewState.newPartState();
    }
  }

  return VIEW_STATE
}

ViewState.initPartStacksForSection = function(sectionNumber) {
  for(var j = 0; j < SONG_STATE.sections[sectionNumber].parts.length; j++) {
    var part = SONG_STATE.sections[sectionNumber].parts[j]
    VIEW_STATE.sections[sectionNumber].parts[j].stack.push(Immutable.fromJS(part))
  }

  return VIEW_STATE
}

ViewState.activePartView = function() {
  var as = ViewState.activeSection
  var ap = ViewState.activePart

  return ViewState.sections[as].parts[ap]
}

ViewState.activePointer = function() {
  return ViewState.activePartView().stackPointer
}

ViewState.activeStack = function() {
  return ViewState.activePartView().stack
}

ViewState.setCursor = function(state, attrs) {
  if(attrs.hasOwnProperty('pitch') && attrs.pitch !== null) {
    state = ViewState.setCursorPitch(state, attrs['pitch'])
  }
  if(attrs.hasOwnProperty('start') && attrs.start !== null){
    state = ViewState.setCursorStart(state, attrs['start'])
  }
  return state
}

ViewState.setCursorPitch = function(state, pitch) {
  if(pitch > 127) {
    state.cursor['pitch'] = 127
  } else if (pitch < 0) {
    state.cursor['pitch'] = 0
  } else {
    state.cursor['pitch'] = pitch
  }
  return state
}

ViewState.setCursorStart = function(state, start) {
  if(start >= SongState.activePart().beats * 96) {
    state.cursor['start'] = (SongState.activePart().beats * 96) - 96
  } else if (start < 0) {
    state.cursor['start'] = 0
  } else {
    state.cursor['start'] = start
  }
  return state
}

ViewState.selectedNotes = function(songState){
  var part = SongState.activePart()

  var selection = ViewState.selection()

  var notesSelectedOnBeatsAxis = part.notes.filter(function(note) {
    return ((note.start + note.length - 1) >= selection.left && note.start < selection.right)
  })

  var selectedNotes = notesSelectedOnBeatsAxis.filter(function(note) {
    return (note.pitch <= selection.top && note.pitch >= selection.bottom);
  })

  return selectedNotes
}

ViewState.selection = function() {
  var anchorCursor = VIEW_STATE['anchorCursor']
  var cursorCursor = VIEW_STATE['cursor']

  var leftEdge = Math.min(anchorCursor.start, cursorCursor.start)
  var rightEdge = Math.max(anchorCursor.start + anchorCursor.length, cursorCursor.start + cursorCursor.length)
  var topPitch = Math.max(anchorCursor.pitch, cursorCursor.pitch)
  var bottomPitch = Math.min(anchorCursor.pitch, cursorCursor.pitch)

  return {
    left: leftEdge,
    right: rightEdge,
    top: topPitch,
    bottom: bottomPitch
  }
}

ViewState.selectedTag = function() {
  return ViewState.sections[ViewState.activeSection].parts[ViewState.activePart].selectedTag
}

ViewState.newPartState = function() {
  var newPartViewState = {selectedTag: null, stack: [], stackPointer: 0}
  return newPartViewState
}

ViewState.newSectionState = function(partsNumber) {
  var newPartsState = Array.from(Array(partsNumber)).map(function(){ return ViewState.newPartState(); })
  return {parts: newPartsState}
}
