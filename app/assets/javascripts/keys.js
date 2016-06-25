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

  SONG_STATE = savePartState(songFn, SONG_STATE);
  VIEW_STATE = viewFn(delayedAction(VIEW_STATE));

  window.SONG_VIEW.forceUpdate();
}

function savePartState(songFn, songState) {
  if (songFn === NOOP) {
    return songState;
  }

  if (songFn.prototype.isUndoFunction) {
    return songFn(songState);
  }

  var ap = VIEW_STATE.activePart;
  var as = VIEW_STATE.activeSection;

  var newSongState = songFn(songState);
  var newState = Immutable.fromJS(SongState.activePart(songState));
  var pointer = ViewState.activePointer(State.view());
  var currentState = ViewState.activeStack(State.view())[pointer];

  if (!Immutable.fromJS(newState).equals(currentState)) {
    localStorage.setItem('currentSong', JSON.stringify(newSongState));

    if (window.location.pathname.match(/new/))
      window.history.pushState({}, 'Song', 'current');

    var stack = ViewState.activeStack(State.view());
    stack.splice(pointer + 1, stack.length - 1, newState);
    ViewState.activePartView(State.view()).stackPointer = ++pointer;
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
