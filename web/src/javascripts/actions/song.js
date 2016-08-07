window.Song = {};

Song.addNote = function(songState, viewState, number) {
  var notesToAdd = number || 1;

  var cursor = ViewState.activeCursor(viewState);

  var noteStart = cursor.start;
  var newNotes = Array.from(Array(notesToAdd).keys()).map(function() {
    var note = SongState.newNote(noteStart, cursor.pitch, 96);
    noteStart += 96;
    return note;
  })

  SongState.tagNotes(newNotes);

  var existingNotes = SongState.activePart(songState, viewState).notes;
  Array.prototype.splice.apply(existingNotes, [existingNotes.length, existingNotes.length].concat(newNotes));

  return songState;
}

Song.newSong = function(_s, _v) {
  return JSON.parse(JSON.stringify(INITIAL_SONG_STATE));
}

Song.setProperty = function(songState, viewState, keyValueArg) {
  var keyValueArray = keyValueArg.split("=");
  var key = keyValueArray[0];
  var value = keyValueArray[1];

  if (key === "loop") {
    songState.sections[ViewState.activeSection]['loop'] = value;
  } else if (key === "channel" || key === "output" || key === "beats") {
    SongState.activePart(songState, viewState)[key] = value;
  } else {
    songState[key] = value;
  }

  return songState;
}

Song.getProperty = function(viewState, songState, propertyName) {
  if (propertyName === "loop") {
    var propertyValue =  songState.sections[ViewState.activeSection][propertyName];
  } else if (propertyName === "channel" || propertyName === "output" || propertyName === "beats") {
    var propertyValue =  SongState.activePart(songState, viewState)[propertyName];
  } else {
    var propertyValue = songState[propertyName];
  }

  viewState['commandResult'] = `${propertyName}=${propertyValue}`;
  return viewState;
}

Song.setSection = function(songState, viewState, sectionArgument) {
  if (sectionArgument.indexOf('!') > 0) {
    var section = {parts: [], loop: 1};

    songState.sections[0].parts.forEach(function(part){
      var newPart = JSON.parse(JSON.stringify(INITIAL_SONG_STATE.sections[0].parts[0]));
      newPart.channel = part.channel;
      newPart.output = part.output;
      section['parts'].push(newPart);
    });

    var sectionsLength = songState["sections"].push(section);
    songState["arrangement"].push(sectionsLength - 1);
  }

  return songState;
}

Song.duplicateSection = function(songState, viewState) {
  var section = {parts: [], loop: 1}

  songState.sections[ViewState.activeSection].parts.forEach(function(part) {
    var newPart = JSON.parse(JSON.stringify(part));
    section['parts'].push(newPart);
  });

  var sectionsLength = songState["sections"].push(section);
  songState["arrangement"].push(sectionsLength - 1)

  return songState;
}

Song.removeSection = function(songState, viewState) {
  delete songState["sections"][viewState.activeSection];
  songState["sections"] = songState["sections"].filter(Boolean);

  songState["arrangement"] = songState["arrangement"].filter((sectionNumber) => { sectionNumber !== viewState.activeSection })

  return songState;
}

var metaAttributes = {isUndoFunction: true};
Song.removeSection.prototype = metaAttributes;

Song.setRemovedSection = function(viewState, songState) {
  delete viewState["sections"][viewState.activeSection];
  viewState["sections"] = viewState["sections"].filter(Boolean);

  viewState.activeSection = viewState.activeSection - 1;

  return viewState;
}

Song.setPart = function(songState, viewState, partArgument) {
  if (partArgument.indexOf('!') > 0) {
    const sections = songState.sections;
    for(let i = 0; i < sections.length; i++) {
      sections[i].parts.push(SongState.newPart());
    }
  }

  return songState;
}

Song.setActiveSection = function(viewState, songState, sectionArgument) {
  var newActiveSection = parseInt(sectionArgument);

  if (viewState.sections[newActiveSection] === undefined && songState.sections[newActiveSection]) {
    viewState["activeSection"] = newActiveSection;
    viewState.sections[newActiveSection] = ViewState.newSectionState(songState.sections[0].parts.length)
    viewState = ViewState.initPartStacksForSection(viewState, newActiveSection)
  } else if (viewState.sections[newActiveSection] === undefined) {
    return SeqError.sectionDoesNotExist(viewState);
  } else {
    viewState["activeSection"] = newActiveSection;
  }

  return viewState;
}

Song.setDuplicatedSection = function(viewState, songState) {
  var newActiveSection =  ViewState.activeSection + 1;

  //get the undo stack for each part so it maintains its Immutability
  const undoStacks = viewState.sections[ViewState.activeSection].parts.map(function(part) {return part.stack;})

  viewState.sections[newActiveSection] = JSON.parse(JSON.stringify(viewState.sections[ViewState.activeSection]));

  const parts = viewState.sections[newActiveSection].parts;

  for(let i = 0; i < parts.length; i++) {
    parts[i].stack = undoStacks[i];
  }

  viewState = ViewState.initPartStacksForSection(viewState, newActiveSection);

  viewState["activeSection"] = newActiveSection;
  return viewState;
}

Song.setActivePart = function(viewState, songState, partArgument) {
  var newActivePart = parseInt(partArgument);

  if (SongState.activeSection(songState, viewState).parts[newActivePart]) {
    viewState["activePart"] = newActivePart;
  } else {
    return SeqError.partDoesNotExist(viewState);
  }

  if (viewState.sections[viewState.activeSection].parts[newActivePart] === undefined) {
    for (let i = 0; i < viewState.sections.length; i++) {
      viewState.sections[i].parts[newActivePart] = ViewState.newPartState();
      viewState = Undo.initStack(viewState, songState, i, newActivePart);
    }
  }

  return viewState;
}

Song.nameSong = function(songState, _) {

  let result = '';

  for(let i = 2; i < arguments.length; i++) {
    result += arguments[i];
    if (i !== arguments.length - 1) result += ' ';
  }

  songState.name = result;

  return songState;
}

Song.setPartOutput = function(songState, viewState, outputArgument) {
  var output = parseInt(outputArgument);

  for(let i = 0; songState.sections.length > i; i++) {
    songState.sections[i].parts[viewState.activePart].output = outputArgument;
  }

  return songState;
}
