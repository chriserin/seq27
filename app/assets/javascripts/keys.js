window.NOOP = function(){}

document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          key = String.fromCharCode(keyboardEvent.charCode);

          fnArray = getFunctionsFor(key);

          songFn = fnArray[0];
          viewFn = fnArray[1];

          songFn(window.SONG_STATE);
          viewFn(window.VIEW_STATE);
          window.SONG_VIEW.forceUpdate();
        }
      );
    }
  }
)

function getFunctionsFor(key) {
  commandFns = [];

  switch (VIEW_STATE.mode) {
    case "normal":
      commandFns = CommandSequence.push(key);
      break;
    case "command":
      commandFns = CommandMode.push(key);
      break;
    case "explorer":
      commandFns = ExplorerMode.push(key);
      break;
  }

  return commandFns;
}
