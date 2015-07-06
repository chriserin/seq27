window.CursorMovement = {}

CursorMovement.moveDown = function(state) {
  state['cursor']['pitch']--;
  return state;
}

CursorMovement.moveUp = function(state) {
  state['cursor']['pitch']++;
  return state;
}

CursorMovement.moveRight = function(state) {
  state['cursor']['start']++;
  return state;
}

CursorMovement.moveLeft = function(state) {
  state['cursor']['start']--;
  return state;
}
