window.CommandSequence = {"sequence": ''};

CommandSequence.push = function(character) {
  commandNodes = currentNode();
  node = commandNodes[character];

  if (node === undefined) {
    //node does not exist
    CommandSequence["sequence"] = '';
    return [NOOP, NOOP];
  } else if (node.length === undefined) {
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
    ":": [NOOP, Modes.commandMode],
    "j": [NOOP, CursorMovement.moveDown],
    "k": [NOOP, CursorMovement.moveUp],
    "h": [NOOP, CursorMovement.moveLeft],
    "l": [NOOP, CursorMovement.moveRight],
    "c": [ Song.addNote, NOOP ],
    " ": [ Song.playStop, NOOP ]
  };

  middleOctaveMidiPitches = {
    "b": 71,
    "a": 69,
    "g": 67,
    "f": 65,
    "e": 64,
    "d": 62,
    "c": 60
  }

  topNode["m"] = moveNodes();

  //TODO: this doesn't work for a third level of nodes
  if (CommandSequence["sequence"] === '') {
    return topNode;
  } else {
    return topNode[CommandSequence["sequence"]];
  }
}

function moveNodes() {
  function createMoveNoteFn(midiPitch) {
    return function(state) { return Move.toMiddleNote(state, midiPitch); };
  }

  nodes = {};
  for(var note in middleOctaveMidiPitches) {
    var midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createMoveNoteFn(midiPitch)];
  }

  return nodes;
}

window.Move = {}

Move.toMiddleNote = function(viewState, note) {
  viewState['cursor']['pitch'] = note;
  return viewState;
}
