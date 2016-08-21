window.Play = {};
Play.ON = 'ON'
Play.OFF = 'OFF'
Play.PLAY_STATE = {isPlaying: false, activeNotes: []};

Play.playStop = function(songState) {
  if (!Play.PLAY_STATE.isPlaying) {
    return Play.play(songState);
  } else {
    Play.stop(songState);
    return songState;
  }
}

Play.stop = function(songState) {

  for(var note of Play.PLAY_STATE.activeNotes) {
    note(0);
  }

  Play.PLAY_STATE = {isPlaying: false, activeNotes: []};

  return songState;
}

Play.maxBeatsForSection = function(section) {
  return section.parts.map(function(part) {
    return parseInt(part.beats || 0)
  }).sort(function(a, b) {
    return b - a;
  })[0]
}

Play.createOnFn = function(channel, pitch, velocity, output, offFn) {
  return function(onTime) {
    Play.PLAY_STATE.activeNotes.push(offFn)
    Midi.sendOn(channel, pitch, velocity, onTime, output)
  }
}

Play.createOffFn = function offFn(channel, pitch, velocity, output, noteStartTime) {
  var offFn = null

  var removeOffFunctionFn = function() {
    removeNote(offFn)
  }

  offFn = function(offTime) {
    var elapsed = performance.now() - Play.PLAY_STATE.songStart

    if (Play.PLAY_STATE.activeNotes.indexOf(offFn) < 0) {
      return;
    }

    if (offTime === 0) {
      offTime = Play.PLAY_STATE.songStart + noteStartTime + 1;
    }

    Midi.sendOff(channel, pitch, velocity, offTime, output);
    removeOffFunctionFn();
  }

  offFn.fnName = `offFn for pitch ${pitch}`;

  return offFn;
}

Play.makeEventsMapForActivePart = function(songState, viewState) {
  var bpm = songState.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var msPerTick = secondsPerTick * 1000;
  var part = SongState.activePart(songState, viewState);
  var maxTicks = part.beats * 96.0;

  var eventsMap = Play.createPartMap(part, msPerTick, 0, maxTicks);
  return eventsMap.sort(function(a, b) { return a[0] - b[0]});
}

Play.makeEventsMapForActivePartFromCursor = function(songState, viewState) {
  var bpm = songState.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var msPerTick = secondsPerTick * 1000;
  var part = SongState.activePart(songState, viewState);
  var maxTicks = part.beats * 96.0;
  var minTicks = ViewState.activeCursor(viewState).start;

  let eventsMap = Play.createPartMap(part, msPerTick, 0, maxTicks);

  const startGreaterThanMinTicksFn = function(event) {
    return event[2] >= minTicks;
  }

  eventsMap = eventsMap.filter(startGreaterThanMinTicksFn);

  return eventsMap.sort(function(a, b) { return a[0] - b[0]});
}

Play.makeEventsMapForSelection = function(songState, viewState) {
  var bpm = songState.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var msPerTick = secondsPerTick * 1000;
  var part = SongState.activePart(songState);
  var maxTicks = part.beats * 96.0;

  var eventsMap = Play.createSelectionMap(SongState.activePart(songState, viewState), msPerTick, 0, maxTicks);
  return eventsMap.sort(function(a, b) { return a[0] - b[0]});
}

Play.makeEventsMapForSection = function(songState, viewState) {
  var bpm = songState.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var msPerTick = secondsPerTick * 1000;
  var section = SongState.activeSection(songState, viewState);

  var [eventsMap, _] = Play.createSectionMap(section, msPerTick, 0);
  return eventsMap.sort(function(a, b) { return a[0] - b[0]});
}

Play.makeEventsMap = function(songState, arrangement) {
  var bpm = songState.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var msPerTick = secondsPerTick * 1000;
  var eventsMap = new Array();

  var loopOffset = 0;
  var sections = songState.sections;
  var section = null;

  for(var arrangementIndex = 0; section = sections[arrangement[arrangementIndex]]; arrangementIndex++) {
    var [sectionMap, loopOffset] = Play.createSectionMap(section, msPerTick, loopOffset);
    eventsMap = eventsMap.concat(sectionMap);
  }

  return eventsMap.sort(function(a, b) { return a[0] - b[0]});
}

Play.createSectionMap = function(section, msPerTick, loopOffset) {
  var maxBeats = Play.maxBeatsForSection(section);
  var sectionMap = new Array();
  let part = null;

  for(var loop = 0; loop < section.loop; loop++) {
    var maxTicks = loopOffset + (maxBeats * 96.0)

    for(var partIndex = 0; part = section.parts[partIndex]; partIndex++) {
      sectionMap = sectionMap.concat(Play.createPartMap(part, msPerTick, loopOffset, maxTicks))
    }

    loopOffset = loopOffset + (maxBeats * 96.0);
  }

  return [sectionMap, loopOffset];
}

Play.createPartMap = function(part, msPerTick, loopOffset, maxTicks) {
  var fillOffset = 0;
  var resultMap = [];

  var sortedNotes = part.notes.sort(function(a, b){ return a.start - b.start})
  if (sortedNotes.length === 0) {
    return [];
  }

  var startGreaterThanMaxTicksFn = function(event) {
    return event[2] > maxTicks;
  }

  var startLessThanMaxTicksFn = function(event) {
    return event[2] < maxTicks;
  }

  while(!resultMap.some(startGreaterThanMaxTicksFn)) {
    resultMap = resultMap.concat(Play.createNotesMap(sortedNotes, msPerTick, loopOffset, fillOffset, part.channel || 1, part.output));
    fillOffset += parseInt(part.beats || maxBeats);
  }

  var nodes = resultMap.filter(startLessThanMaxTicksFn);
  return nodes;
}

Play.createSelectionMap = function(part, msPerTick, loopOffset, maxTicks) {
  var notes = Selection.getSelectedNotes(SONG_STATE)
  notes.sort(function(a, b) {return a.start - b.start})
  return Play.createNotesMap(notes, msPerTick, 0, -notes[0].start / 96.0, part.channel || 1, part.output)
}

Play.createNotesMap = function(notes, msPerTick, loopOffset, fillOffset, channel, output) {
  var resultMap = [];

  for(var note of notes) {
    var noteLengthInMillis = note.length * msPerTick;

    var startTicks = note.start + loopOffset + (fillOffset * 96.0);

    var start = startTicks * msPerTick;

    var onTime = start;
    var offTime = start + noteLengthInMillis - 1;

    var offFn = Play.createOffFn(channel, note.pitch, 80, output, onTime);
    resultMap.push([onTime, Play.createOnFn(channel, note.pitch, note.velocity, output, offFn), startTicks]);
    resultMap.push([offTime, offFn, startTicks]);
  }

  return resultMap;
}

var intervalTask = null
Play.play = function(songState, viewState) {
  Play.PLAY_STATE = {isPlaying: true, activeNotes: []};
  var eventsMap = Play.makeEventsMap(songState, songState.arrangement);

  Play.playEvents(eventsMap);

  return songState;
}

Play.playArrangement = function(songState, viewState, arrangementArgument) {
  Play.PLAY_STATE = {isPlaying: true, activeNotes: []};
  var eventsMap = Play.makeEventsMap(songState, Arrangement.parseArrangementArgument(arrangementArgument));

  Play.playEvents(eventsMap);

  return songState;
}

Play.playPart = function(songState, viewState) {
  Play.PLAY_STATE = {isPlaying: true, activeNotes: []};

  var eventsMap = Play.makeEventsMapForActivePart(songState, viewState);

  Play.playEvents(eventsMap);

  return songState;
}

Play.playPartFromCursor = function(songState, viewState) {
  Play.PLAY_STATE = {isPlaying: true, activeNotes: []};

  var eventsMap = Play.makeEventsMapForActivePartFromCursor(songState, viewState);

  Play.playEvents(eventsMap);

  return songState;
}

Play.playSelection = function(songState, viewState) {
  Play.PLAY_STATE = {isPlaying: true, activeNotes: []};

  var eventsMap = Play.makeEventsMapForSelection(songState, viewState);

  Play.playEvents(eventsMap);

  return songState;
}

Play.playSection = function(songState, viewState) {
  Play.PLAY_STATE = {isPlaying: true, activeNotes: []};

  var eventsMap = Play.makeEventsMapForSection(songState, viewState);

  Play.playEvents(eventsMap);

  return songState;
}

Play.playEvents = function(eventsMap) {
  scheduleNotes(JUST_IN_TIME_INCREMENT, eventsMap);
  var callScheduleFn = function() {
    if (scheduleFnStack.length > 0) {
      scheduleFnStack.shift()();
    }
  }

  intervalTask = setInterval(callScheduleFn, JUST_IN_TIME_INCREMENT );
}

var removeNote = function(note) {
  var index = Play.PLAY_STATE.activeNotes.indexOf(note);

  if (index > -1) {
    delete Play.PLAY_STATE.activeNotes[index];
    Play.PLAY_STATE.activeNotes = Play.PLAY_STATE.activeNotes.filter(Boolean);
  }

  return Play.PLAY_STATE.activeNotes;
}

var scheduleFnStack = [];
var JUST_IN_TIME_INCREMENT = 20;
var scheduleNotes = function(startOffset, eventsMap, songStart) {
  var eventLimit = startOffset + 5;

  while(eventsMap.length > 0) {
    var data = eventsMap.shift();
    var eventTime = data[0];

    var songStart = Play.PLAY_STATE.songStart = songStart || function(){ return performance.now() + 50;}();
    if (songStart + eventTime <= (performance.now() + 50) + JUST_IN_TIME_INCREMENT) {
      if (Play.PLAY_STATE.isPlaying) {
        data[1](songStart + eventTime);
      }
    } else {
      eventsMap.unshift(data);
      break;
    }
  }

  if (eventsMap.length > 0) {
    if (Play.PLAY_STATE.isPlaying) {
      scheduleFnStack.push(function() { scheduleNotes(startOffset + JUST_IN_TIME_INCREMENT, eventsMap, songStart); });
    }
  } else {
    clearInterval(intervalTask);
    Play.PLAY_STATE = {isPlaying: false, activeNotes: []};
  }
}
