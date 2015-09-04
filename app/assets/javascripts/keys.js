window.NOOP = function(state){return state;}

document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          var key = String.fromCharCode(keyboardEvent.charCode);

          var fnArray = getFunctionsFor(key);

          var songFn = fnArray[0];
          var viewFn = fnArray[1];

          SONG_STATE = songFn(SONG_STATE);
          VIEW_STATE = viewFn(VIEW_STATE);
          window.SONG_VIEW.forceUpdate();
        }
      );
    }
  }
)

function getFunctionsFor(key) {
  var commandFns = [];

  switch (ViewState.mode) {
    case "normal":
      commandFns = NormalMode.push(key);
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
