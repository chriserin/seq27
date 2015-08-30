window.ExplorerMode = {}

ExplorerMode.push = function(character) {
  var commandNodes = ExplorerMode.currentNode()

  var commandFns = commandNodes[character]

  return commandFns
}

ExplorerMode.currentNode = function() {
  var topNode = {
    'h': [NOOP, Explore.hideParts],
    'j': [NOOP, Explore.moveCursorDown],
    'k': [NOOP, Explore.moveCursorUp],
    'l': [NOOP, Explore.showParts],
    "\r": [NOOP, Explore.goToPartOrSection]
  };

  return topNode;
}
