window.SongState = {};

SongState.currentNote = function(songState) {
  for(note of SongState.allNotes(songState)) {
    if (note.lastAdded === true) {
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
  partsNotes = section.parts.map(function(part) { return part.notes; });
  return [].concat.apply([], partsNotes); //flatten
}
