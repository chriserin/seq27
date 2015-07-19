window.Song = {};

Song.addNote = function(songState) {
  songState["song"]["sections"][VIEW_STATE.active_section - 1]["parts"][0]["notes"].push({pitch: VIEW_STATE['cursor']['pitch'], start: 0, length: 96});
  return songState;
}

Song.newSong = function(songState) {
  songState.song = {tempo: 60, beats: 4, sections: [{parts: [{notes: []}]}]};
  return songState;
}

Song.setProperty = function(songState, commandWithArguments) {
  keyValueArg = commandWithArguments.split(" ")[1];
  keyValueArray = keyValueArg.split("=");
  key = keyValueArray[0];
  value = keyValueArray[1];
  if (key === "loop") {
    songState.song.sections[VIEW_STATE.active_section - 1]['loop'] = value;
  } else {
    songState.song[key] = value;
  }
  return songState;
}

Song.getProperty = function(viewState, commandWithArguments) {
  var propertyName = commandWithArguments.split(" ")[1];


  if (propertyName === "loop") {
    var propertyValue =  SONG_STATE.song.sections[VIEW_STATE.active_section - 1][propertyName];
  } else {
    var propertyValue = SONG_STATE.song[propertyName];
  }

  VIEW_STATE['commandResult'] = `${propertyName}=${propertyValue}`
  return viewState;
}

Song.setSection = function(songState, commandWithArgumets) {
  sectionArgument = commandWithArgumets.split(" ")[1];

  if (sectionArgument.indexOf('!') > 0) {
    songState.song["sections"].push({parts: [{notes: []}], loop: 1});
  }

  return songState;
}

Song.setActiveSection = function(viewState, commandWithArgumets) {
  sectionArgument = commandWithArgumets.split(" ")[1];

  viewState["active_section"] = parseInt(sectionArgument);

  return viewState;
}
