window.ExplorerMode = {}

ExplorerMode.push = function(character) {
  var commandNodes = ExplorerMode.currentNode()

  var commandFns = commandNodes[character]

  return commandFns
}

ExplorerMode.currentNode = function() {
  var topNode = {
    'k': [NOOP, Explore.moveCursorUp],
    'j': [NOOP, Explore.moveCursorDown],
    "\r": [NOOP, Explore.goToPartOrSection]
  };

  return topNode;
}
