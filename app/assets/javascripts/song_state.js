window.SongState = {};

SongState.currentNotes = function(songState) {
  var activePart = SongState.activePart()
  var sortedNotes = activePart.notes.sort(function(a, b) { return a.timestamp - b.timestamp;})
  console.log(sortedNotes);

  var tag = sortedNotes[0].timestamp
  console.log(tag);

  var results = []

  for(var i = 0; i < sortedNotes.length; i++) {
    console.log(tag);

    if (sortedNotes[i].timestamp === tag) {
      results.push(sortedNotes[i])
    }
  }

  return results;
}

SongState.allNotes = function(songState) {
  var sectionsNotes = songState.song.sections.map(function(section) { return SongState.allNotesForSection(section); });
  return [].concat.apply([], sectionsNotes); //flatten
}

SongState.allNotesForSection = function(section) {
  partsNotes = section.parts.map(function(part) { return part.notes.map(function(note) {return {note: note, parent: part};}) });
  return [].concat.apply([], partsNotes); //flatten
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
  return {pitch: pitch, start: start, length: length}
}

SongState.activeSection = function() {
  return SONG_STATE["song"]["sections"][VIEW_STATE.active_section - 1]
}

SongState.activePart = function() {
  console.log('activepart is ' + VIEW_STATE.active_part)
  console.log(JSON.stringify(SongState.activeSection()))
  return SongState.activeSection()["parts"][VIEW_STATE.active_part - 1]
}

SongState.tagNotes = function(notes) {
  var timestamp = Date.now()

  for(var note of notes) {
    note.timestamp = timestamp
  }

  return notes
}
