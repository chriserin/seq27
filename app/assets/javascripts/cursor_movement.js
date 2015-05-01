window.CursorMovement = {}

CursorMovement.moveDown = function(state) {
  //state['cursor']['pitch'] = state['cursor']['pitch'] + 1
  state['cursor']['pitch']++;
  return state;
}

CursorMovement.moveUp = function(state) {
  state['cursor']['pitch']--;
  return state;
}

CursorMovement.moveRight = function(state) {
  state['cursor']['beats']++;
  return state;
}

CursorMovement.moveLeft = function(state) {
  state['cursor']['beats']--;
  return state;
}
