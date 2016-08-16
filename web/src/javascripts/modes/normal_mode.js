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
    const commandFns = addNumberArgument(node); //array of 2 functions or just 1 function
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

  const number = parseInt(NormalMode['number']);

  if (node.length === undefined) {
    const numberedNode = function(state) {return node(state, number); }
    return numberedNode;
  } else {
    let songFn = function(songState, viewState) {return node[0](songState, viewState, number); };
    let viewFn = function(viewState, songState) {return node[1](viewState, songState, number); };
    songFn.prototype = node[0].prototype;
    viewFn.prototype = node[1].prototype;

    return [songFn, viewFn];
  }
}

function captureNumber(possibleNumber) {
  const parsedNumber = parseInt(possibleNumber);

  if(isNaN(parsedNumber)) {
    return false;
  } else if (parseInt(NormalMode["number"] + possibleNumber) > 0) {
    NormalMode["number"] += possibleNumber;
    NormalMode["totalSequence"] += possibleNumber;
    return true;
  }

  return false;
}

function currentNode(character) {
  const topNode = {
    "y": [NOOP, Copy.yank],
    "p": [Copy.paste, Groups.setSelectedTag],
    "o": [NOOP, Move.upOctave],
    "O": [NOOP, Move.downOctave],
    "0": [NOOP, CursorMovement.moveToZero],
    "U": [Undo.redo, Groups.selectPreviousGroup],
    "u": [Undo.undo, Groups.selectPreviousGroup],
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
    "$": [NOOP, CursorMovement.moveToEnd],
    "\r": [NOOP, Modes.endVisualMode]
  };

  const middleOctaveMidiPitches = {
    "b": 71,
    "a": 69,
    "g": 67,
    "f": 65,
    "e": 64,
    "d": 62,
    "c": 60
  };

  topNode["m"] = moveNodes(middleOctaveMidiPitches);
  topNode["t"] = toUpNodes(middleOctaveMidiPitches);
  topNode["T"] = toDownNodes(middleOctaveMidiPitches);
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

function moveNodes(middleOctaveMidiPitches) {
  function createMoveNoteFn(midiPitch) {
    return function(state, songState, number) { return Move.toMiddleNote(state, midiPitch, number); };
  }

  const nodes = {};
  for(var note in middleOctaveMidiPitches) {
    var midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createMoveNoteFn(midiPitch)];
  }

  return nodes;
}

function toUpNodes(middleOctaveMidiPitches) {
  function createToNoteFn(midiPitch) {
    return function(state, number) { return Move.upToNote(state, midiPitch); };
  }

  const nodes = {};
  for(let note in middleOctaveMidiPitches) {
    let midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createToNoteFn(midiPitch)];
  }

  return nodes;
}

function toDownNodes(middleOctaveMidiPitches) {
  function createToNoteFn(midiPitch) {
    return function(state, number) { return Move.downToNote(state, midiPitch); };
  }

  const nodes = {};
  for(let note in middleOctaveMidiPitches) {
    let midiPitch = middleOctaveMidiPitches[note];
    nodes[note] = [NOOP, createToNoteFn(midiPitch)];
  }

  return nodes;
}

function lengthenNodes() {
  const nodes = {
    ">": [Note.doubleLength, NOOP]
  }
  return nodes;
}

function shortenNodes() {
  const nodes = {
    "<": [Note.halveLength, NOOP]
  }
  return nodes;
}

function adjustMovementNodes() {
  const nodes = {
    "H": [Move.moveSelectionSlightlyLeft, Modes.endSelectingMode],
    "L": [Move.moveSelectionSlightlyRight, Modes.endSelectingMode]
  }

  return nodes;
}

function quarterMovementNodes() {
  const nodes = {
    "H": [function (songState, _, number){ return Move.moveSelectionLeft(songState, _, number, 24) }, Modes.endSelectingMode],
    "L": [function (songState, _, number){ return Move.moveSelectionRight(songState, _, number, 24) }, Modes.endSelectingMode]
  }

  return nodes;
}

function thirdMovementNodes() {
  const nodes = {
    "H": [function (songState, _, number){ return Move.moveSelectionLeft(songState, _, number, 32) }, Modes.endSelectingMode],
    "L": [function (songState, _, number){ return Move.moveSelectionRight(songState, _, number, 32) }, Modes.endSelectingMode]
  }

  return nodes;
}

function snapToBeatNodes() {
  const nodes = {
    "H": [Move.moveSelectionToLeftBeat, Modes.endSelectingMode],
    "L": [Move.moveSelectionToRightBeat, Modes.endSelectingMode]
  }

  return nodes;
}

function deleteNodes() {
  let nodes = {
    "d": [Delete.deleteLatest, Groups.selectPreviousGroup]
  }

  if (ViewState.mode === 'visual') {
    nodes = [Delete.deleteSelected, Groups.selectPreviousGroup]
  }

  return nodes;
}

function createNodes() {
  const nodes = {
    "n": [Song.addNote, Groups.setSelectedTag],
    "h": [Chord.major, Groups.setSelectedTag],
    "m": [Chord.minor, Groups.setSelectedTag]
  }
  return nodes;
}

function gotoNodes() {
  const nodes = {
    "g": [NOOP, CursorMovement.moveToTop]
  }
  return nodes;
}

function cycleLeftNodes() {
  const nodes = {
    "g": [NOOP, Groups.selectPreviousGroup],
    "s": [NOOP, Section.previousSection],
    "p": [NOOP, Part.previousPart]
  }
  return nodes;
}

function cycleRightNodes() {
  const nodes = {
    "g": [NOOP, Groups.selectNextGroup],
    "s": [NOOP, Section.nextSection],
    "p": [NOOP, Part.nextPart]
  }
  return nodes;
}

function playNodes() {
  const nodes = {
    "z": [Play.play, NOOP],
    "p": [Play.playPart, NOOP],
    "s": [Play.playSelection, NOOP],
    "S": [Play.playSection, NOOP]
  }
  return nodes;
}
