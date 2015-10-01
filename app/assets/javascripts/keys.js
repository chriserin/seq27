window.NOOP = function(state){return state;}

document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          keyboardEvent.preventDefault()
          var key = String.fromCharCode(keyboardEvent.charCode);

          if (keyboardEvent.keyCode == '27') {
            key = 'ESC'
          }

          var fnArray = getFunctionsFor(key);

          var songFn = fnArray[0];
          var viewFn = fnArray[1];

          SONG_STATE = songFn(SONG_STATE);
          VIEW_STATE = viewFn(delayedAction(VIEW_STATE));

          window.SONG_VIEW.forceUpdate();
        }
      );
    }
  }
)

function delayedAction(viewState) {
  if (viewState.delayedAction) {
    viewState.delayedAction(viewState)
    viewState.delayedAction = null
  }
  return viewState
}

function getFunctionsFor(key) {
  var commandFns = [];

  switch (ViewState.mode) {
    case "normal":
      commandFns = NormalMode.push(key);
      break;
    case "command":
      commandFns = CommandMode.push(key);
      break;
    case "visual":
      commandFns = NormalMode.push(key);
      break;
    case "explorer":
      commandFns = ExplorerMode.push(key);
      break;
  }

  return commandFns;
}
