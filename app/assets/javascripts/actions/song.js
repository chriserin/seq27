window.Song = {};

Song.addNote = function(songState) {
  cursor = ViewState.cursor
  SongState.activePart().notes.push(SongState.newNote(cursor.start, cursor.pitch, 96))
  return songState;
}

Song.createChord = function(songState) {
  cursor = ViewState.cursor
  results = []
  var activePart = SongState.activePart()
  var newNote = SongState.newNote(cursor.start, cursor.pitch, 96)
  results.push(newNote)
  activePart.notes.push(newNote)
  newNote = SongState.newNote(cursor.start, cursor.pitch + 3, 96)
  results.push(newNote)
  activePart.notes.push(newNote)
  newNote = SongState.newNote(cursor.start, cursor.pitch + 7, 96)
  results.push(newNote)
  activePart.notes.push(newNote)
  SongState.tagNotes(results)
  return songState;
}

Song.newSong = function(songState) {
  return JSON.parse(JSON.stringify(INITIAL_SONG_STATE));
}

Song.setProperty = function(songState, commandWithArguments) {
  keyValueArg = commandWithArguments.split(" ")[1];
  var keyValueArray = keyValueArg.split("=");
  var key = keyValueArray[0];
  var value = keyValueArray[1];

  if (key === "loop") {
    songState.sections[ViewState.activeSection]['loop'] = value;
  } else if (key === "channel" || key === "output" || key === "beats") {
    SongState.activePart()[key] = value
  } else {
    songState[key] = value;
  }

  return songState;
}

Song.getProperty = function(viewState, commandWithArguments) {
  var propertyName = commandWithArguments.split(" ")[1];

  if (propertyName === "loop") {
    var propertyValue =  SONG_STATE.sections[ViewState.activeSection][propertyName];
  } else if (propertyName === "channel" || propertyName === "output" || propertyName === "beats") {
    var propertyValue =  SongState.activePart()[propertyName]
  } else {
    var propertyValue = SONG_STATE[propertyName];
  }

  viewState['commandResult'] = `${propertyName}=${propertyValue}`
  return viewState;
}

Song.setSection = function(songState, commandWithArgumets) {
  var sectionArgument = commandWithArgumets.split(" ")[1];

  if (sectionArgument.indexOf('!') > 0) {
    var section = {parts: [], loop: 1}

    songState.sections[0].parts.forEach(function(){
      section['parts'].push({beats: 4, notes: []})
    });

    var sectionsLength = songState["sections"].push(section);
    songState["arrangement"].push(sectionsLength - 1)
  }

  return songState;
}

Song.setPart = function(songState, commandWithArgumets) {
  var partArgument = commandWithArgumets.split(" ")[1];

  if (partArgument.indexOf('!') > 0) {
    SongState.activeSection().parts.push(SongState.newPart())
  }

  return songState;
}

Song.setActiveSection = function(viewState, commandWithArgumets) {
  var sectionArgument = commandWithArgumets.split(" ")[1];

  viewState["activeSection"] = parseInt(sectionArgument);

  return viewState;
}

Song.setActivePart = function(viewState, commandWithArgumets) {
  var partArgument = commandWithArgumets.split(" ")[1];

  viewState["activePart"] = parseInt(partArgument);

  return viewState;
}
