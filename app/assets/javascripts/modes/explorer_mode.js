window.ExplorerMode = {}

ExplorerMode.push = function(character) {
  var commandNodes = ExplorerMode.currentNode()

  var commandFns = commandNodes[character]

  if (commandFns === undefined) {
    return [NOOP, NOOP]
  }

  return commandFns
}

ExplorerMode.currentNode = function() {
  var topNode = {}
  if (ViewState.explorerMode === 'visual') {
    topNode = {
      'k': [Explore.moveMarkedSectionUp, Explore.moveCursorUp],
      'ESC': [NOOP, Explore.normalMode]
    }
  } else {
    topNode = {
      'h': [NOOP, Explore.hideParts],
      'j': [NOOP, Explore.moveCursorDown],
      'k': [NOOP, Explore.moveCursorUp],
      'l': [NOOP, Explore.showParts],
      'v': [NOOP, Explore.visualMode],
      "\r": [NOOP, Explore.goToPartOrSection]
    };
  }

  return topNode;
}
