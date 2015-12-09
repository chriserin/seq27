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
    var songFn = function(state) {return node[0](state, number); };
    var viewFn = function(state) {return node[1](state, number); };
    songFn.prototype = node[0].prototype
    viewFn.prototype = node[1].prototype

    return [songFn, viewFn]
  }
}

function captureNumber(possibleNumber) {
  parsedNumber = parseInt(possibleNumber);

  if(isNaN(parsedNumber)) {
    return false;
  } else if (parseInt(NormalMode["number"] + possibleNumber) > 0) {
    NormalMode["number"] += possibleNumber
    NormalMode["totalSequence"] += possibleNumber
    return true;
  }

  return false
}

function currentNode(character) {
  topNode = {
    "y": [NOOP, Copy.yank],
    "p": [Copy.paste, Groups.setSelectedTag],
    "o": [NOOP, Move.upOctave],
    "O": [NOOP, Move.downOctave],
    "0": [NOOP, CursorMovement.moveToZero],
    "U": [Undo.redo, NOOP],
    "u": [Undo.undo, NOOP],
    ":": [NOOP, Modes.commandMode],
    "j": [NOOP, CursorMovement.moveDown],
    "k": [NOOP, CursorMovement.moveUp],
    "h": [NOOP, CursorMovement.moveLeft],
    "l": [NOOP, CursorMovement.moveRight],
    "w": [NOOP, function(viewState) { return CursorMovement.moveRight(viewState, 4)}],
    " ": [ Play.playStop, NOOP ],
    "n": [NOOP, CursorMovement.moveToNextNote],
    "N": [NOOP, CursorMovement.moveToPrevNote],
    "G": [NOOP, CursorMovement.moveToBottom],
    "v": [NOOP, Modes.visualMode],
    "J": [Move.moveSelectionDown, Modes.endSelectingMode],
    "K": [Move.moveSelectionUp, Modes.endSelectingMode],
    "H": [Move.moveSelectionLeft, Modes.endSelectingMode],
    "L": [Move.moveSelectionRight, Modes.endSelectingMode],
    "\r": [NOOP, Modes.endVisualMode]
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
  topNode["["] = cycleLeftNodes();
  topNode["]"] = cycleRightNodes();
  topNode["a"] = adjustMovementNodes();
  topNode["q"] = quarterMovementNodes();
  topNode["r"] = thirdMovementNodes();
  topNode["s"] = snapToBeatNodes();
  topNode["z"] = playNodes();

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

function adjustMovementNodes() {
  var nodes = {
    "H": [Move.moveSelectionSlightlyLeft, Modes.endSelectingMode],
    "L": [Move.moveSelectionSlightlyRight, Modes.endSelectingMode]
  }

  return nodes;
}

function quarterMovementNodes() {
  var nodes = {
    "H": [function (songState, number){ return Move.moveSelectionLeft(songState, number, 24) }, Modes.endSelectingMode],
    "L": [function (songState, number){ return Move.moveSelectionRight(songState, number, 24) }, Modes.endSelectingMode]
  }

  return nodes;
}

function thirdMovementNodes() {
  var nodes = {
    "H": [function (songState, number){ return Move.moveSelectionLeft(songState, number, 32) }, Modes.endSelectingMode],
    "L": [function (songState, number){ return Move.moveSelectionRight(songState, number, 32) }, Modes.endSelectingMode]
  }

  return nodes;
}

function snapToBeatNodes() {
  var nodes = {
    "H": [Move.moveSelectionToLeftBeat, Modes.endSelectingMode],
    "L": [Move.moveSelectionToRightBeat, Modes.endSelectingMode]
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
  var nodes = {
    "n": [Song.addNote, Groups.setSelectedTag],
    "h": [Chord.major, Groups.setSelectedTag],
    "m": [Chord.minor, Groups.setSelectedTag]
  }
  return nodes;
}

function gotoNodes() {
  var nodes = {
    "g": [NOOP, CursorMovement.moveToTop]
  }
  return nodes;
}

function cycleLeftNodes() {
  var nodes = {
    "g": [NOOP, Groups.selectPreviousGroup]
  }
  return nodes
}

function cycleRightNodes() {
  var nodes = {
    "g": [NOOP, Groups.selectNextGroup]
  }
  return nodes
}

function playNodes() {
  var nodes = {
    "z": [Play.play, NOOP],
    "p": [Play.playPart, NOOP]
  }
  return nodes
}
