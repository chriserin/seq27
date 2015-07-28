window.Play = {};
Play.PLAY_STATE = {isPlaying: false, activeNotes: []};

Play.playStop = function(songState) {
  if (!Play.PLAY_STATE.isPlaying) {
    Play.PLAY_STATE = {isPlaying: true, activeNotes: []};
    return Play.play(songState);
  } else {
    Play.stop(songState);
    return songState;
  }
}

Play.stop = function(songState) {
  for(var note of Play.PLAY_STATE.activeNotes) {
    Midi.sendOff(1, note.pitch, velocity = 80, 0);
    removeNote(note);
  }

  Play.PLAY_STATE = {isPlaying: false, activeNotes: []};

  return songState;
}

Play.makeEventsMap = function(songState) {
  var bpm = songState.song.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var eventsMap = new Array();

  var createOnFn = function(channel, pitch, velocity) {
    return function(onTime) {
      Midi.sendOn(1, pitch, velocity = 80, onTime);
    };
  }

  var createOffFn = function(channel, pitch, velocity) {
    return function(offTime) { Midi.sendOff(1, pitch, velocity = 80, offTime); };
  }

  var loopOffset = 0;
  for(var section = 0; section < songState.song.sections.length; section++) {
    for(var loop = 0; loop < songState.song.sections[section].loop; loop++) {
      for(var part = 0; part < songState.song.sections[section].parts.length; part++) {
        for(var note of songState.song.sections[section].parts[part].notes) {
          noteLengthInMillis = note.length * (secondsPerTick * 1000);

          var start = note.start * (secondsPerTick * 1000) + loopOffset;
          Play.PLAY_STATE.activeNotes.push(note);

          var onTime = start;
          var offTime = noteLengthInMillis + start;

          eventsMap.push([onTime, createOnFn(1, note.pitch, velocity = 80, onTime) ]);
          eventsMap.push([offTime, createOffFn(1, note.pitch, velocity = 80, offTime) ]);

          var removeNoteFn = function (note) {
            removeNote(note);
          }

          setTimeout(removeNoteFn, offTime);
        }

      }
      loopOffset = loopOffset + (1000.0 * secondsPerTick) * (songState.song.beats * 96.0);
    }
  }

  return eventsMap;
}

Play.play = function(songState) {
  Play.PLAY_STATE.activeNotes = [];
  var eventsMap = Play.makeEventsMap(songState);

  scheduleNotes(JUST_IN_TIME_INCREMENT, eventsMap);
  var callScheduleFn = function() {
    if (scheduleFnStack.length > 0) {
      scheduleFnStack.shift()();
    }
  }

  setInterval(callScheduleFn, JUST_IN_TIME_INCREMENT );

  return songState;
}

var removeNote = function(note) {
  index = Play.PLAY_STATE.activeNotes.indexOf(note);
  if (index > -1) {
    Play.PLAY_STATE.activeNotes.slice(index, 1);
  }
  return Play.PLAY_STATE.activeNotes;
}


var scheduleFnStack = [];
var JUST_IN_TIME_INCREMENT = 10;
var scheduleNotes = function(startOffset, eventsMap, songStart) {
  var eventLimit = startOffset + 5;

  while(eventsMap.length > 0) {
    var data = eventsMap.shift();
    var eventTime = data[0];

    songStart = songStart || function(){ return performance.now() + 50;}();
    if (songStart + eventTime <= (performance.now() + 50) + eventLimit) {
      scheduleTime = songStart + eventTime;
      if (eventTime === 0) {
      }
      data[1](songStart + eventTime);
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
    Play.PLAY_STATE = {isPlaying: false, activeNotes: []};
  }
}

