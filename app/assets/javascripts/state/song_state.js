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

SongState.currentNotes = function(songState) {
  var activePart = SongState.activePart()
  var sortedNotes = activePart.notes.sort(function(a, b) { return a.timestamp - b.timestamp;})

  var tag = sortedNotes[0].timestamp

  var results = []

  for(var i = 0; i < sortedNotes.length; i++) {

    if (sortedNotes[i].timestamp === tag) {
      results.push(sortedNotes[i])
    }
  }

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

SongState.activeSection = function() {
  return SONG_STATE["sections"][ViewState.activeSection - 1]
}

SongState.activePart = function() {
  return SongState.activeSection()["parts"][ViewState.activePart - 1]
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

SongState.arrangedSections = function() {
  return SONG_STATE['arrangement'].map(function(sectionIndex) { return [sectionIndex, SONG_STATE['sections'][sectionIndex]] })
}
