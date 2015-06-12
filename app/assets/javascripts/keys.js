document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          key = String.fromCharCode(keyboardEvent.charCode);

          commands = commandMapping();
          fnArray = commands.getFunctionsFor(key);

          songFn = fnArray[0];
          viewFn = fnArray[1];

          songFn(window.SONG_STATE, key);
          viewFn(window.VIEW_STATE, key);
          window.PART_VIEW.forceUpdate();
        }
      );
    }
  }
)

CommandSet = function(commands) {
  this.commands = commands;
  this.get = function(commandChar) {
    this[commandChar];
  }
  this.getFunctionsFor = function(key) {
    commandFns = this.commands[key];
    if(commandFns === undefined) {
      commandFns = [].concat.apply([], [this.commands["default"]]);
    } else {
      commandFns = [].concat.apply([], [commandFns]);
    }

    if(commandFns.length == 1) {
      commandFns.unshift(NOOP)
    }

    return commandFns;
  }
}

function commandMapping() {
  normalModeCommands = {
    ":": Modes.commandMode,
    "j": CursorMovement.moveDown,
    "k": CursorMovement.moveUp,
    "h": CursorMovement.moveLeft,
    "l": CursorMovement.moveRight,
    "c": [ Song.addNote, NOOP ],
    " ": [ Song.playStop, NOOP ],
    "default": [NOOP, NOOP]
  }

  commandModeCommands = {
    "\r": [CommandMode.executeCommandBuffer, Modes.normalMode],
    "default": [NOOP, CommandMode.addToCommandBuffer]
  }

  commands = {}

  switch (window.VIEW_STATE.mode) {
    case "normal":
      commands = normalModeCommands;
      break;
    case "command":
      commands = commandModeCommands;
      break;
  }

  return new CommandSet(commands);
}

NOOP = function(){}
