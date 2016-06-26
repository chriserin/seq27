window.NOOP = function(state){return state;}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener('keydown',
    function(keyboardEvent) {

      if(keyboardEvent.keyCode === 8) { //backspace
        keyboardEvent.preventDefault()

        if (ViewState.mode === 'command') {
          VIEW_STATE = CommandMode.removeFromCommandBuffer(VIEW_STATE)
        }
        window.SONG_VIEW.forceUpdate();
      } else {
        if(['ArrowUp', 'ArrowDown'].indexOf(keyboardEvent.key) > -1) {
          processKey(keyboardEvent.key);
        }
      }
    }
  );
})

document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          keyboardEvent.preventDefault()

          var key = String.fromCharCode(keyboardEvent.charCode);

          if (keyboardEvent.keyCode == '27') {
            key = 'ESC'
          }

          processKey(key);
        }
      );
    }
  }
)

function processKey(key) {
  var fnArray = getFunctionsFor(key);

  var songFn = fnArray[0];
  var viewFn = fnArray[1];

  SONG_STATE = savePartState(songFn, SONG_STATE, VIEW_STATE);
  VIEW_STATE = viewFn(delayedAction(VIEW_STATE), SONG_STATE);

  window.SONG_VIEW.forceUpdate();
}

function savePartState(songFn, songState, viewState) {
  if (songFn === NOOP) {
    return songState;
  }

  if (songFn.prototype.isUndoFunction) {
    return songFn(songState, viewState);
  }

  var newSongState = songFn(songState, viewState);
  var newState = Immutable.fromJS(SongState.activePart(songState, viewState));
  var pointer = ViewState.activePointer(viewState);
  var currentState = ViewState.activeStack(viewState)[pointer];

  if (!Immutable.fromJS(newState).equals(currentState)) {
    localStorage.setItem('currentSong', JSON.stringify(newSongState));

    if (window.location.pathname.match(/new/))
      window.history.pushState({}, 'Song', 'current');

    var stack = ViewState.activeStack(viewState);
    stack.splice(pointer + 1, stack.length - 1, newState);
    ViewState.activePartView(viewState).stackPointer = ++pointer;
  }

  return newSongState;
}

function delayedAction(viewState) {
  if (viewState.delayedAction) {
    viewState.delayedAction(viewState)
    viewState.delayedAction = null
  }
  return viewState;
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
