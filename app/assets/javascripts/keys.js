document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keypress',
        function(keyboardEvent) {
          key = String.fromCharCode(keyboardEvent.charCode);

          commands = commandMapping();

          if(commands[key]){
            commands[key](window.VIEW_STATE);
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
    "l": CursorMovement.moveRight
  }
}
