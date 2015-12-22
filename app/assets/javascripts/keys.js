window.NOOP = function(state){return state;}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener('keydown',
    function(keyboardEvent) {
      if(keyboardEvent.keyCode === 8) {
        keyboardEvent.preventDefault()
        if (ViewState.mode === 'command') {
          VIEW_STATE = CommandMode.removeFromCommandBuffer(VIEW_STATE)
        }
        window.SONG_VIEW.forceUpdate();
      }
    }
  );
})

document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      //TODO: Replace this thing with ELM
      document.addEventListener('keypress',
        function(keyboardEvent) {
          keyboardEvent.preventDefault()
          var key = String.fromCharCode(keyboardEvent.charCode);

          if (keyboardEvent.keyCode == '27') {
            console.log('Pressing ESC')
            key = 'ESC'
          }

          var fnArray = getFunctionsFor(key);

          Controller.execute(fnArray)
        }
      );
    }
  }
)

window.Controller = {}

Controller.execute = function(fnArray) {
  var songFn = fnArray[0];
  var viewFn = fnArray[1];

  SONG_STATE = savePartState(songFn, SONG_STATE);
  VIEW_STATE = viewFn(delayedAction(VIEW_STATE));

  window.SONG_VIEW.forceUpdate();
}

function savePartState(songFn, songState) {
  if (songFn === NOOP) {
    return songState;
  }

  if (songFn.prototype.isUndoFunction) {
    return songFn(songState)
  }

  var ap = VIEW_STATE.activePart
  var as = VIEW_STATE.activeSection

  var newSongState = songFn(songState)
  var newState = Immutable.fromJS(SongState.activePart())
  var pointer = ViewState.activePointer()
  var currentState = ViewState.activeStack()[pointer]

  if (!Immutable.fromJS(newState).equals(currentState)) {
    var stack = ViewState.activeStack()
    stack.splice(pointer + 1, stack.length - 1, newState)
    ViewState.activePartView().stackPointer = ++pointer
  }

  return newSongState
}

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
