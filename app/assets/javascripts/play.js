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

Play.makeEventsMap = function(songState) {
  var bpm = songState.song.tempo;
  var secondsPerTick = 60 / (96.0 * bpm);
  var msPerTick = secondsPerTick * 1000;
  var eventsMap = new Array();

  var createOnFn = function(channel, pitch, velocity, output) {
    return function(onTime) {
      Midi.sendOn(channel, pitch, velocity = 80, onTime, output);
    };
  }

  var createOffFn = function(channel, pitch, velocity, output) {
    return function(offTime) { Midi.sendOff(channel, pitch, velocity = 80, offTime, output); };
  }

  var loopOffset = 0;
  var sections = songState.song.sections
  var section = null, part = null;
  for(var sectionIndex = 0; section = sections[sectionIndex]; sectionIndex++) {
    var maxBeats = Play.maxBeatsForSection(section)

    for(var loop = 0; loop < section.loop; loop++) {
      for(var partIndex = 0; part = section.parts[partIndex]; partIndex++) {
        var sectionFilled = false
        var fillOffset = 0;
        var count = 0

        while((!sectionFilled) && (count < 5)) {
          for(var note of part.notes) {
            var noteLengthInMillis = note.length * msPerTick;

            var startTicks = note.start + loopOffset + (fillOffset * 96.0)
            var maxTicks = loopOffset + (maxBeats * 96.0)

            if (startTicks < maxTicks) {
              var start = startTicks * msPerTick
              Play.PLAY_STATE.activeNotes.push(note);

              var onTime = start;
              var offTime = start + noteLengthInMillis;

              var channel = part.channel || 1
              var output =  part.output
              eventsMap.push([onTime, createOnFn(channel, note.pitch, velocity = 80, output) ]);
              eventsMap.push([offTime, createOffFn(channel, note.pitch, velocity = 80, output) ]);

            } else {
              sectionFilled = true
              break;
            }
          }
          count++
          fillOffset += parseInt(part.beats || maxBeats)
        }
      }
      loopOffset = loopOffset + (maxBeats * 96.0);
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

