window.SongState = {};

INITIAL_SONG_STATE = {
  tempo: 60,
  arrangement: [0],
  sections: [
    {
      loop: 1,
      parts: [
         {
           beats: 4,
           notes: []
         }
      ]
    }
  ]
}

SongState.activeSection = function() {
  return SONG_STATE["sections"][ViewState.activeSection]
}

SongState.activePart = function() {
  return SongState.activeSection()["parts"][ViewState.activePart]
}

SongState.arrangedSections = function() {
  return SONG_STATE['arrangement'].map(function(sectionIndex) { return [sectionIndex, SONG_STATE['sections'][sectionIndex]] })
}

SongState.activeArrangementIndex = function() {
  var sectionId = ViewState.activeSection

  return SONG_STATE.arrangement.findIndex(function(arrangementSectionId) {return arrangementSectionId === sectionId})
}

SongState.currentGroupNotes = function(songState) {
  var activePart = SongState.activePart()
  var sortedNotes = activePart.notes.sort(function(a, b) { return a.timestamp - b.timestamp;})

  var tag = sortedNotes[0].timestamp

  var results = sortedNotes.filter(function(note){ return note.timestamp === tag})

  return results;
}

SongState.indexOfNote = function(lookedForNote, parent) {
  var counter = 0;
  for (var note of parent.notes) {
    if(lookedForNote === note) {
      return counter;
    }
    counter++;
  }
  return -1;
}

SongState.newNote = function(start, pitch, length) {
  return {
    pitch: pitch,
    start: start,
    length: length
  }
}

SongState.tagNotes = function(notes) {
  var timestamp = Date.now()

  for(var note of notes) {
    note.timestamp = timestamp
  }

  return notes
}

SongState.sectionsLength = function() {
  return SONG_STATE['sections'].length
}
