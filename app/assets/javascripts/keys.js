document.addEventListener("DOMContentLoaded", function () {
    if(window.song) {
      document.addEventListener('keydown',
        function(keyboardEvent) {
          key = keyboardEvent.keyCode || keyboardEvent.which

          if(String.fromCharCode(key) == 'J') {
            window.VIEW_STATE = {cursor: {beats: 0, pitch: 1}};
            window.PART_VIEW.forceUpdate();
          }
          if(String.fromCharCode(key) == 'K') {
            window.VIEW_STATE = {cursor: {beats: 0, pitch: 0}};
            window.PART_VIEW.forceUpdate();
          }
          if(String.fromCharCode(key) == 'H') {
            window.VIEW_STATE = {cursor: {beats: 0, pitch: 0}};
            window.PART_VIEW.forceUpdate();
          }
          if(String.fromCharCode(key) == 'L') {
            window.VIEW_STATE = {cursor: {beats: 1, pitch: 0}};
            window.PART_VIEW.forceUpdate();
          }
        }
      );
    }
  }
)
