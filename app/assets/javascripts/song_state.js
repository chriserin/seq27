window.SongState = {};

SongState.currentNote = function(songState) {
  for(var note of SongState.allNotes(songState)) {
    if (note['note'].lastAdded === true) {
      return note;
    }
  };
  return {"message": "this is a null note object"};
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

SongState.activePart = function() {
  return SONG_STATE["song"]["sections"][VIEW_STATE.active_section - 1]["parts"][0]
}
