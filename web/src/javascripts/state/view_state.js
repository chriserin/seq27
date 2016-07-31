window.INITIAL_VIEW_STATE = {
  mode: 'normal',
  yankedNotes: [],
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
  sections: [{parts: [{
    cursor: {
      pitch: 60,
      start: 0,
      length: 96
    },
    selectedTag: null,
    stack: [],
    stackPointer: 0,
    visuallySelectedNotes: null}]}
  ],
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

function defineProp(viewState, stateKey) {
  Object.defineProperty(ViewState, stateKey, { get: function() {return viewState[stateKey]}})
  return viewState;
}

ViewState.init = function(songState) {
  let viewState = JSON.parse(JSON.stringify(INITIAL_VIEW_STATE));

  for (var stateKey in viewState) {
    defineProp(viewState, stateKey);
  }

  for(var i = 0; i < songState.sections.length; i++) {
    viewState = ViewState.initSection(viewState, i)
    viewState = ViewState.initPartViewForSection(viewState, i)
    viewState = ViewState.initPartStacksForSection(viewState, i)
  }

  return viewState;
}

ViewState.initSection = function(viewState, sectionNumber) {
  viewState.sections[sectionNumber] = {parts: []};
  return viewState;
}

ViewState.initPartViewForSection = function(viewState, sectionNumber) {
  for(let j = 0; j < State.song().sections[sectionNumber].parts.length; j++) {
    const partView = viewState.sections[sectionNumber].parts[j];

    if (typeof partView === 'undefined') {
      let part = State.song().sections[sectionNumber].parts[j];
      let newPartState = ViewState.newPartState();
      newPartState.selectedTag = SongState.latestTag(State.song(), part);
      const focusedNote = part.notes.find((note) => {return note.timestamp === newPartState.selectedTag; });

      if (focusedNote) {
        newPartState.cursor = {start: focusedNote.start, pitch: focusedNote.pitch, length: 96};
      }

      viewState.sections[sectionNumber].parts[j] = newPartState;
    }
  }

  return viewState;
}

ViewState.initPartStacksForSection = function(viewState, sectionNumber) {
  for(var j = 0; j < State.song().sections[sectionNumber].parts.length; j++) {
    var part = State.song().sections[sectionNumber].parts[j];
    viewState.sections[sectionNumber].parts[j].stack.push(Immutable.fromJS(part));
  }

  return viewState;
}

ViewState.activePartView = function(viewState) {
  var as = ViewState.activeSection;
  var ap = ViewState.activePart;

  return viewState.sections[as].parts[ap];
}

ViewState.activePointer = function ap(viewState) {
  return ViewState.activePartView(viewState).stackPointer;
}

ViewState.activeStack = function as(viewState) {
  return ViewState.activePartView(viewState).stack;
}

ViewState.setCursor = function(viewState, attrs) {
  if(attrs.hasOwnProperty('pitch') && attrs.pitch !== null) {
    viewState = ViewState.setCursorPitch(viewState, attrs['pitch'])
  }

  if(attrs.hasOwnProperty('start') && attrs.start !== null){
    viewState = ViewState.setCursorStart(viewState, attrs['start'])
  }

  return viewState;
}

ViewState.setCursorPitch = function(viewState, pitch) {
  const partView = ViewState.activePartView(viewState);

  if(pitch > 127) {
    partView.cursor['pitch'] = 127;
  } else if (pitch < 0) {
    partView.cursor['pitch'] = 0;
  } else {
    partView.cursor['pitch'] = pitch;
  }
  return viewState;
}

ViewState.setCursorStart = function(viewState, start) {
  const partView = ViewState.activePartView(viewState);

  if(start >= SongState.activePart(State.song()).beats * 96) {
    partView.cursor['start'] = (SongState.activePart(State.song()).beats * 96) - 96;
  } else if (start < 0) {
    partView.cursor['start'] = 0;
  } else {
    partView.cursor['start'] = start;
  }

  return viewState;
}

ViewState.selectedNotes = function(viewState, songState){
  var part = SongState.activePart(songState);

  var selection = ViewState.selection(viewState);

  var notesSelectedOnBeatsAxis = part.notes.filter(function(note) {
    return ((note.start + note.length - 1) >= selection.left && note.start < selection.right);
  });

  var selectedNotes = notesSelectedOnBeatsAxis.filter(function(note) {
    return (note.pitch <= selection.top && note.pitch >= selection.bottom);
  });

  return selectedNotes;
}

ViewState.selection = function(viewState) {
  var anchorCursor = viewState['anchorCursor'];
  var cursorCursor = ViewState.activeCursor(viewState);

  var leftEdge = Math.min(anchorCursor.start, cursorCursor.start);
  var rightEdge = Math.max(anchorCursor.start + anchorCursor.length, cursorCursor.start + cursorCursor.length);
  var topPitch = Math.max(anchorCursor.pitch, cursorCursor.pitch);
  var bottomPitch = Math.min(anchorCursor.pitch, cursorCursor.pitch);

  return {
    left: leftEdge,
    right: rightEdge,
    top: topPitch,
    bottom: bottomPitch
  };
}

ViewState.selectedTag = function(viewState) {
  return viewState.sections[ViewState.activeSection].parts[ViewState.activePart].selectedTag;
}

ViewState.newPartState = function() {
  var newPartViewState = JSON.parse(JSON.stringify(INITIAL_VIEW_STATE.sections[0].parts[0]));
  return newPartViewState;
}

ViewState.newSectionState = function(partsNumber) {
  var newPartsState = Array.from(Array(partsNumber)).map(function(){ return ViewState.newPartState(); });
  return {parts: newPartsState};
}

ViewState.activeCursor = function ac(viewState){
  return ViewState.activePartView(viewState).cursor;
}

ViewState.set = function(viewState, prop, value) {
  viewState[prop] = value;
  return viewState;
}
