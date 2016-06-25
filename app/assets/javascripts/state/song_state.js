window.SongState = {};

INITIAL_SONG_STATE = {
  name: null,
  tempo: 120,
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

SongState.activeSection = function(songState) {
  return songState["sections"][ViewState.activeSection];
}

SongState.activePart = function(songState) {
  const activeSection = SongState.activeSection(songState);
  const part = activeSection["parts"][ViewState.activePart];
  return part;
}

SongState.notesForActivePart = function(songState) {
  var part = SongState.activePart(songState);

  return part.notes.filter(function(note) {
    return note.start < part.beats * 96;
  })
}

SongState.replaceActivePart = function(songState, newPart) {
  return SongState.activeSection(songState)["parts"][ViewState.activePart] = newPart;
}

SongState.arrangedSections = function(songState) {
  return songState['arrangement'].map(function(sectionIndex) { return [sectionIndex, songState['sections'][sectionIndex]] });
}

SongState.activeArrangementIndex = function(songState) {
  var sectionId = ViewState.activeSection

  return songState.arrangement.findIndex(function(arrangementSectionId) {return arrangementSectionId === sectionId})
}

SongState.currentGroupNotes = function(songState) {

  var tag = ViewState.selectedTag(State.view());
  var results = SongState.activePart(songState).notes.filter(function(note){ return note.timestamp === tag})

  return results;
}

SongState.latestTag = function(songState, part) {
  var activePart = part || SongState.activePart(songState);
  var sortedNotes = activePart.notes.map(function(n) {return n}).sort(function(a, b) { return b.timestamp - a.timestamp;});

  if (sortedNotes[0]) {
    var tag = sortedNotes[0].timestamp;
    return tag;
  } else {
    return null;
  }
}

SongState.activePartTags = function(songState) {
  var notes = SongState.activePart(songState).notes;

  var uniqueSortedTags = notes.map(function(n) {return n.timestamp}).filter(function (e, i, arr) {
      return arr.lastIndexOf(e) === i;
  }).sort(function(a, b) { return b.timestamp - a.timestamp;});

  return uniqueSortedTags;
}

SongState.currentPartNotes = function(songState) {
  var activePart = SongState.activePart(songState);
  var sortedNotes = activePart.notes.sort(function(a, b) { if (a.start === b.start) {return b.pitch - a.pitch } else { return a.start - b.start};});

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
    length: length,
    velocity: 80
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
  var timestamp = Date.now();

  for(var note of notes) {
    note.timestamp = timestamp;
  }

  return notes;
}

SongState.sectionsLength = function(songState) {
  return songState['sections'].length;
}
