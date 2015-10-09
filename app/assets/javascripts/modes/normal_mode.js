window.NormalMode = {"sequence": '', "number": '', totalSequence: ''};

NormalMode.push = function(character) {
  var isNumber = captureNumber(character);
  if (isNumber) {return [NOOP, NOOP];}

  var commandNodes = currentNode();
  var node = commandNodes[character];

  if (node === undefined) {
    //node does not exist
    NormalMode["sequence"] = '';
    NormalMode["totalSequence"] = '';
    NormalMode["number"] = '';
    return [NOOP, NOOP];
  } else if (node.length === undefined) {
    //node contains nodes
    NormalMode["sequence"] += character;
    NormalMode["totalSequence"] += character;
    return [NOOP, NOOP];
  } else {
    //node is an end node
    commandFns = addNumberArgument(node); //array of 2 functions or just 1 function
    NormalMode["sequence"] = '';
    NormalMode["number"] = '';
    NormalMode["totalSequence"] = '';
    return commandFns;
  }
}

function addNumberArgument(node) {
  if(NormalMode["number"] === '') {
    return node;
  }

  number = parseInt(NormalMode['number']);

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
    NormalMode["number"] += possibleNumber
    NormalMode["totalSequence"] += possibleNumber
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
    " ": [ Play.playStop, NOOP ],
    "n": [NOOP, CursorMovement.moveToNextNote],
    "N": [NOOP, CursorMovement.moveToPrevNote],
    "G": [NOOP, CursorMovement.moveToBottom],
    "v": [NOOP, Modes.visualMode]
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
  topNode["d"] = deleteNodes();
  topNode["c"] = createNodes();
  topNode["g"] = gotoNodes();

  //TODO: this doesn't work for a third level of nodes
  if (NormalMode["sequence"] === '') {
    return topNode;
  } else {
    return topNode[NormalMode["sequence"]];
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

function deleteNodes() {
  var nodes = {
    "d": [Delete.deleteLatest, NOOP]
  }

  if (ViewState.mode === 'visual') {
    nodes = [Delete.deleteSelected, NOOP]
  }

  return nodes;
}

function createNodes() {
  nodes = {
    "n": [Song.addNote, NOOP],
    "h": [Song.createChord, NOOP]
  }
  return nodes;
}

function gotoNodes() {
  var nodes = {
    "g": [NOOP, CursorMovement.moveToTop]
  }
  return nodes;
}

