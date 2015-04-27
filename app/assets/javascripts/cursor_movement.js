window.CursorMovement = {}

CursorMovement.moveDown = function(state) {
  state['cursor']['pitch'] = state['cursor']['pitch'] + 1
  return state;
}

CursorMovement.moveUp = function(state) {
  state['cursor']['pitch'] = state['cursor']['pitch'] - 1
  return state;
}

CursorMovement.moveRight = function(state) {
  state['cursor']['beats'] = state['cursor']['beats'] + 1
  return state;
}

CursorMovement.moveLeft = function(state) {
  state['cursor']['beats'] = state['cursor']['beats'] - 1
  return state;
}
