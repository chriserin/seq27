window.NOOP = function(){}

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
      default_commands = this.commands["default"];

      if (default_commands === undefined) {
        commandFns = CommandSequence.push(key);
      } else {
        commandFns = default_commands;
      }
    }

    return commandFns;
  }
}

function commandMapping() {
  normalModeCommands = {
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
