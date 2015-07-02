window.Song = {};
window.PLAY_STATE = {isPlaying: false, activeNotes: []};

Song.addNote = function(songState) {
  songState["song"]["notes"].push({pitch: 1, start: 0, length: 96});
  return songState;
}

Song.playStop = function(songState) {
  if (!PLAY_STATE.isPlaying) {
    PLAY_STATE = {isPlaying: true, activeNotes: []};
    return Song.play(songState);
  } else {
    Song.stop(songState);
    PLAY_STATE = null;
    return songState;
  }
}

Song.stop = function(songState) {
  for(var note of PLAY_STATE.activeNotes) {
    Midi.sendOff(1, note.pitch, velocity = 80, 0);
    removeNote(note);
  }
  return songState;
}

Song.play = function(songState) {
  var started_at = performance.now() + 2;
  var bpm = songState.song.tempo;
  var seconds_per_tick = 60 / (96.0 * bpm);

  PLAY_STATE.activeNotes = [];

  for(var note of songState.song.notes) {
    note_length_in_millis = note.length * (seconds_per_tick * 1000)

    var start = note.start * (seconds_per_tick * 1000) + started_at;
    PLAY_STATE.activeNotes.push(note);

    Midi.sendOn(1, note.pitch, velocity = 80, start);
    offTime = note_length_in_millis + start;
    Midi.sendOff(1, note.pitch, velocity = 80, offTime);

    removeNoteFn = function (note) {
      removeNote(note);
    }

    setTimeout(removeNoteFn, offTime);
  }

  return songState;
}

var removeNote = function(note) {
  index = PLAY_STATE.activeNotes.indexOf(note);
  if (index > -1) {
    PLAY_STATE.activeNotes.slice(index, 1);
  }
  return PLAY_STATE.activeNotes;
}

Song.newSong = function(songState) {
  songState.song = {tempo: 60, notes: []};
  return songState;
}

Song.setProperty = function(songState, commandWithArguments) {
  keyValueArg = commandWithArguments.split(" ")[1];
  keyValueArray = keyValueArg.split("=");
  key = keyValueArray[0];
  value = keyValueArray[1];
  songState.song[key] = value;
  return songState;
}

Song.getProperty = function(viewState, commandWithArguments) {
  propertyName = commandWithArguments.split(" ")[1];
  VIEW_STATE['commandResult'] = `${propertyName}=${SONG_STATE.song[propertyName]}`
  return viewState;
}
