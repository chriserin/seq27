document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          key = String.fromCharCode(keyboardEvent.charCode);

          commands = commandMapping();

          if(commands[key] && !(commands[key] instanceof Array)){
            commands[key](window.VIEW_STATE);
            window.PART_VIEW.forceUpdate();
          } else if ( commands[key] && commands[key] instanceof Array){
            songFn = commands[key][0];
            viewFn = commands[key][1] || NOOP;

            songFn(window.SONG_STATE);
            viewFn(window.VIEW_STATE);
            window.PART_VIEW.forceUpdate();
          }
        }
      );
    }
  }
)

function commandMapping() {
  return {
    "j": CursorMovement.moveDown,
    "k": CursorMovement.moveUp,
    "h": CursorMovement.moveLeft,
    "l": CursorMovement.moveRight,
    "c": [ Song.addNote ]
  }
}

NOOP = function(){}
