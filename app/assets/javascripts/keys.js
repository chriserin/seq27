document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keydown',
        function(keyboardEvent) {
          key = keyboardEvent.keyCode || keyboardEvent.which;

          if(String.fromCharCode(key) == 'J') {
            CursorMovement.moveDown(window.VIEW_STATE);
          }
          if(String.fromCharCode(key) == 'K') {
            CursorMovement.moveUp(window.VIEW_STATE);
          }
          if(String.fromCharCode(key) == 'H') {
            CursorMovement.moveLeft(window.VIEW_STATE);
          }
          if(String.fromCharCode(key) == 'L') {
            CursorMovement.moveRight(window.VIEW_STATE);
          }

          window.PART_VIEW.forceUpdate();
        }
      );
    }
  }
)
