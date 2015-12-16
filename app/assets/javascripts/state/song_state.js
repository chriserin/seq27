window.SongState = {};

INITIAL_SONG_STATE = {
  tempo: 60,
  arrangement: [0],
  sections: [
    {
      loop: 1,
      parts: [
         {
           beats: 16,
           notes: [],
           channel: 1,
           output: 0
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

SongState.notesForActivePart = function() {
  var part = SongState.activePart()
  return part.notes.filter(function(note) {
    return note.start < part.beats * 96
  })
}

SongState.replaceActivePart = function(newPart) {
  return SongState.activeSection()["parts"][ViewState.activePart] = newPart
}

SongState.arrangedSections = function() {
  return SONG_STATE['arrangement'].map(function(sectionIndex) { return [sectionIndex, SONG_STATE['sections'][sectionIndex]] })
}

SongState.activeArrangementIndex = function() {
  var sectionId = ViewState.activeSection

  return SONG_STATE.arrangement.findIndex(function(arrangementSectionId) {return arrangementSectionId === sectionId})
}

SongState.currentGroupNotes = function(songState) {
  var tag = ViewState.selectedTag()
  var results = SongState.activePart().notes.filter(function(note){ return note.timestamp === tag})

  return results;
}

SongState.latestTag = function(songState) {
  var activePart = SongState.activePart()
  var sortedNotes = activePart.notes.map(function(n) {return n}).sort(function(a, b) { return b.timestamp - a.timestamp;})

  if (sortedNotes && sortedNotes.length > 0) {
    return sortedNotes[0].timestamp
  } else {
    return -1
  }
}

SongState.activePartTags = function() {
  var notes = SongState.activePart().notes

  var uniqueSortedTags = notes.map(function(n) {return n.timestamp}).filter(function (e, i, arr) {
      return arr.lastIndexOf(e) === i
  }).sort(function(a, b) { return b.timestamp - a.timestamp;})

  return uniqueSortedTags
}

SongState.currentPartNotes = function(songState) {
  var activePart = SongState.activePart()
  var sortedNotes = activePart.notes.sort(function(a, b) { if (a.start === b.start) {return b.pitch - a.pitch } else { return a.start - b.start};})

  return sortedNotes;
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

SongState.newPart = function() {
  return {
    beats: 16,
    notes: [],
    channel: 1,
    output: 0
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
