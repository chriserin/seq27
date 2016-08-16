window.CommandMode = {}

CommandMode.push = function(key) {
  if (key === "\r") {
    return CommandMode.executionMethods()
  } else if (key === 'ESC') {
    return [NOOP, function(viewState) { return clearCommandBuffer(Modes.normalMode(viewState)) }]
  } else if (key === 'ArrowUp') {
    return [NOOP, CommandMode.showPreviousCommand]
  } else if (key === 'ArrowDown') {
    return [NOOP, CommandMode.showNextCommand]
  }

  return [
    NOOP,
    function(state) { return CommandMode.addToCommandBuffer(state, key); }
  ];
}

CommandMode.commandMapping = function() {
  return {
    "new": [Song.newSong, NOOP],
    "play": [Play.playArrangement, NOOP],
    "name": [Song.nameSong, NOOP],
    "set": [Song.setProperty, CursorMovement.ensureCursorInBounds],
    "get": [NOOP, Song.getProperty],
    "addinst": [Instrument.addInstrument, NOOP],
    "setinst": [Instrument.setInstrument, NOOP],
    "newtemplate": [Instrument.addTemplate, NOOP],
    "applytemplate": [Instrument.applyTemplate, Instrument.initAddedPartViews],
    "section": [Song.setSection, Song.setActiveSection],
    "duplicatesection": [Song.duplicateSection, Song.setDuplicatedSection],
    "removesection": [Song.removeSection, Song.setRemovedSection],
    "part": [Song.setPart, Song.setActivePart],
    "scale": [Scale.create, NOOP],
    "arpeggio": [Arpeggio.create, Groups.setSelectedTag],
    "spacing": [Rhythm.applySpacing, NOOP],
    "squeeze": [Elastic.squeeze, NOOP],
    "compact": [Elastic.compact, NOOP],
    "stretch": [Elastic.stretch, NOOP],
    "fill": [Elastic.fill, NOOP],
    "velocity": [Velocity.applyVelocity, NOOP],
    "duration": [Rhythm.applyDurations, NOOP],
    "arrange": [Arrangement.arrange, NOOP],
    "outputs": [NOOP, Report.outputs],
    "setpartoutput": [Song.setPartOutput, NOOP],
    "map": [NOOP, Report.nodeMap],
    "write": [Save.write, NOOP],
    "update": [Save.update, NOOP],
    "throw": [Testing.throwError, NOOP],
    "panic": [NOOP, Panic.panic],
  };
}

CommandMode.addToCommandBuffer = function(viewState, key) {
  viewState["commandBuffer"].push(key);
  return viewState;
}

CommandMode.removeFromCommandBuffer = function(viewState) {
  if (viewState.commandBuffer.length === 0) {
    return Modes.normalMode(viewState)
  }

  viewState.commandBuffer = viewState.commandBuffer.slice(0, viewState.commandBuffer.length - 1)

  return viewState;
}

CommandMode.executionMethods = function() {
  const commandBuffer = ViewState.commandBuffer.join("");

  const words = parseCommandArguments(commandBuffer);
  const command = words[0];

  const commandMapping = CommandMode.commandMapping();
  let commandFns = commandMapping[command];

  if(commandFns === undefined) {
    commandFns = [NOOP, function(viewState) {return SeqError.notACommand(viewState, command);}];
  }

  var songStateFn = function (songState, viewState) {
    return commandFns[0](songState, viewState, ...(words.slice(1)));
  }
  songStateFn.prototype = commandFns[0].prototype;

  var viewStateFn = function (viewState, songState) {
    viewState.delayedAction = function(state) { state.commandResult = ''; return state};
    var state = commandFns[1](viewState, songState, ...(words.slice(1)));
    state = Modes.transitionToNextMode(state);
    state = recordCommandBuffer(state);
    return clearCommandBuffer(state);
  }

  return [songStateFn, viewStateFn];
}

var parseCommandArguments = function(buffer) {
  return buffer.match(/".*"|[^ ]+/g).map((arg) => { return arg.replace(/"/g, '');});
}

var recordCommandBuffer = function (viewState) {
  const commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
  commandHistory.push(viewState['commandBuffer']);
  localStorage.setItem('commandHistory', JSON.stringify(commandHistory));

  viewState["commandHistoryIndex"] = -1;

  return viewState;
}

var clearCommandBuffer = function(viewState) {
  viewState["commandBuffer"] = []
  return viewState
}

CommandMode.showPreviousCommand = function(viewState) {
  const commandHistory = JSON.parse(localStorage.getItem('commandHistory'));
  let commandHistoryIndex = viewState["commandHistoryIndex"];

  if (commandHistoryIndex === -1) {
    commandHistoryIndex = commandHistory.length - 1;
  } else {
    commandHistoryIndex -= 1;
  }

  viewState["commandHistoryIndex"] = commandHistoryIndex;
  viewState["commandBuffer"] = commandHistory[commandHistoryIndex];

  return viewState;
}

CommandMode.showNextCommand = function(viewState) {
  const commandHistory = JSON.parse(localStorage.getItem('commandHistory'));
  let commandHistoryIndex = viewState["commandHistoryIndex"];

  if (commandHistoryIndex >= commandHistory.length - 1) {
  } else if (commandHistoryIndex > 0) {
    commandHistoryIndex = commandHistoryIndex + 1;
  }

  viewState["commandHistoryIndex"] = commandHistoryIndex;
  viewState["commandBuffer"] = commandHistory[commandHistoryIndex];

  return viewState;
}
