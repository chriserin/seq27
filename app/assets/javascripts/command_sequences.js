window.CommandSequence = {"sequence": '', "number": ''};

CommandSequence.push = function(character) {
  isNumber = captureNumber(character);
  if (isNumber) {return [NOOP, NOOP];}

  commandNodes = currentNode();
  node = commandNodes[character];

  if (node === undefined) {
    //node does not exist
    CommandSequence["sequence"] = '';
    CommandSequence["number"] = '';
    return [NOOP, NOOP];
  } else if (node.length === undefined) {
    //node contains nodes
    CommandSequence["sequence"] += character;
    return [NOOP, NOOP];
  } else {
    //node is an end node
    commandFns = addNumberArgument(node); //array of 2 functions or just 1 function
    CommandSequence["sequence"] = '';
    CommandSequence["number"] = '';
    return commandFns;
  }
}

function addNumberArgument(node) {
  if(CommandSequence["number"] === '') {
    return node;
  }

  number = parseInt(CommandSequence['number']);

  if (node.length === undefined) {
    numberedNode = function(state) {return node(state, number); }
    return numberedNode;
  } else {
    return [function(state) {return node[0](state, number); }, function(state) {return node[1](state, number); }]
  }
}

function captureNumber(possibleNumber) {
  parsedNumber = parseInt(possibleNumber);

  if(isNaN(parsedNumber)) {
    return false;
  } else {
    CommandSequence["number"] += possibleNumber
    return true;
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
    " ": [ Play.playStop, NOOP ]
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
  topNode["t"] = toUpNodes();
  topNode["T"] = toDownNodes();
  topNode[">"] = lengthenNodes();
  topNode["<"] = shortenNodes();

  //TODO: this doesn't work for a third level of nodes
  if (CommandSequence["sequence"] === '') {
    return topNode;
  } else {
    return topNode[CommandSequence["sequence"]];
  }
}

function moveNodes() {
  function createMoveNoteFn(midiPitch) {
    return function(state, number) { return Move.toMiddleNote(state, midiPitch, number); };
  }

  nodes = {};
  for(var note in middleOctaveMidiPitches) {
    var midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createMoveNoteFn(midiPitch)];
  }

  return nodes;
}

function toUpNodes() {
  function createToNoteFn(midiPitch) {
    return function(state, number) { return Move.upToNote(state, midiPitch); };
  }

  nodes = {};
  for(var note in middleOctaveMidiPitches) {
    var midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createToNoteFn(midiPitch)];
  }
  nodes["o"] = [NOOP, Move.upOctave];

  return nodes;
}

function toDownNodes() {
  function createToNoteFn(midiPitch) {
    return function(state, number) { return Move.downToNote(state, midiPitch); };
  }

  nodes = {};
  for(var note in middleOctaveMidiPitches) {
    var midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createToNoteFn(midiPitch)];
  }
  nodes["o"] = [NOOP, Move.downOctave];

  return nodes;
}

function lengthenNodes() {
  nodes = {
    ">": [Note.doubleLength, NOOP]
  }
  return nodes;
}

function shortenNodes() {
  nodes = {
    "<": [Note.halveLength, NOOP]
  }
  return nodes;
}

window.Move = {}

Move.toMiddleNote = function(viewState, note, octave) {
  octave = octave || 5;
  convertedNote = note % 12 + octave * 12;
  viewState['cursor']['pitch'] = convertedNote;
  return viewState;
}

Move.upOctave = function(viewState) {
  viewState['cursor']['pitch'] += 12;
  return viewState;
}

Move.downOctave = function(viewState) {
  viewState['cursor']['pitch'] -= 12;
  return viewState;
}

Move.upToNote = function(viewState, note) {
  noteDiff = note % 12;
  currentNoteDiff = viewState['cursor']['pitch'] % 12;
  if (noteDiff > currentNoteDiff)
    viewState['cursor']['pitch'] += noteDiff - currentNoteDiff;
  else
    viewState['cursor']['pitch'] += (noteDiff - currentNoteDiff) + 12;

  return viewState;
}

Move.downToNote = function(viewState, note) {
  noteDiff = note % 12;
  currentNoteDiff = viewState['cursor']['pitch'] % 12;
  if (noteDiff > currentNoteDiff)
    viewState['cursor']['pitch'] += (noteDiff - currentNoteDiff) - 12;
  else
    viewState['cursor']['pitch'] += (noteDiff - currentNoteDiff);
  return viewState;
}
