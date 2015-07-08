window.CommandSequence = {"sequence": ''};

CommandSequence.push = function(character) {
  commandNodes = currentNode();
  node = commandNodes[character];

  if (node === undefined) {
    //node does not exist
    CommandSequence["sequence"] = '';
    return [NOOP, NOOP];
  } else if ((node.length === undefined) && (typeof node !== 'function')) {
    //node contains nodes
    CommandSequence["sequence"] += character;
    return [NOOP, NOOP];
  } else {
    //node is an end node
    CommandSequence["sequence"] = '';
    return node; //array of 2 functions or just 1 function
  }
}

function currentNode(character) {
  topNode = {
    ":": Modes.commandMode,
    "j": CursorMovement.moveDown,
    "k": CursorMovement.moveUp,
    "h": CursorMovement.moveLeft,
    "l": CursorMovement.moveRight,
    "c": [ Song.addNote, NOOP ],
    " ": [ Song.playStop, NOOP ]
  };

  topNode["m"] = {
    "d": [NOOP, function(state) { Move.toMiddleNote(state, 62)}],
    "c": [NOOP, function(state) { Move.toMiddleNote(state, 60)}]
  };

  //TODO: this doesn't work for a third level of nodes
  if (CommandSequence["sequence"] === '') {
    return topNode;
  } else {
    return topNode[CommandSequence["sequence"]];
  }
}

window.Move = {}

Move.toMiddleNote = function(viewState, note) {
  viewState['cursor']['pitch'] = note;
  return viewState;
}
