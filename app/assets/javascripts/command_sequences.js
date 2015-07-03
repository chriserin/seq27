window.CommandSequence = {"sequence": ''};

CommandSequence.push = function(character) {
  CommandSequence["sequence"] += character;
  sequences = sequencedCommands();
  commands = sequences[CommandSequence["sequence"]]

  if (commands === undefined) {
    return [NOOP, NOOP];
  } else {
    CommandSequence["sequence"] = '';
    return commands;
  }
}

function sequencedCommands() {
  return {
    "mc": [NOOP, Move.toMiddleC],
    ":": Modes.commandMode,
    "j": CursorMovement.moveDown,
    "k": CursorMovement.moveUp,
    "h": CursorMovement.moveLeft,
    "l": CursorMovement.moveRight,
    "c": [ Song.addNote, NOOP ],
    " ": [ Song.playStop, NOOP ]
  };
}

window.Move = {}

Move.toMiddleC = function(viewState) {
  viewState['cursor']['pitch'] = 60;
  return viewState;
}
