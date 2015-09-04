window.Explore = {}

Explore.enterExploreMode = function(viewState) {

  viewState.mode = "explorer"
  viewState.explorerCursor.sectionId = viewState['activeSection']
  viewState.explorerCursor.partId    = viewState['activePart']

  return viewState;
}

Explore.moveCursorUp = function(viewState) {
  var explorerCursor = viewState['explorerCursor']
  if (explorerCursor.sectionId === 1 && explorerCursor.partId === 0) {
    return viewState
  }

  if (explorerCursor.partId > 0) {
    explorerCursor.partId = explorerCursor.partId - 1
  } else {
    explorerCursor.sectionId = explorerCursor.sectionId - 1
    explorerCursor.partId = SongState.activeSection().parts.length
  }

  return viewState
}

Explore.moveCursorDown = function(viewState) {
  var explorerCursor = viewState['explorerCursor']
  var maxParts = SongState.activeSection().parts.length
  var maxSections = SongState.sectionsLength()

  if (explorerCursor.sectionId === maxSections && explorerCursor.partId === maxParts) {
    return viewState
  }

  if (explorerCursor.partId < maxParts) {
    explorerCursor.partId = explorerCursor.partId + 1
  } else {
    explorerCursor.sectionId = explorerCursor.sectionId + 1
    explorerCursor.partId = 0
  }

  return viewState
}

Explore.goToPartOrSection = function(viewState) {
  var explorerCursor = viewState['explorerCursor']

  if ( explorerCursor.partId === 0) {
    viewState.activePart = 1
  } else {
    viewState.activePart = explorerCursor.partId
  }
  viewState.activeSection = explorerCursor.sectionId

  return Modes.normalMode(viewState)
}

Explore.hideParts = function(viewState) {
  viewState.explorerCursor.partId = 0
  viewState.explorerDisplayParts = false
  return viewState
}

Explore.showParts = function(viewState) {
  viewState.explorerCursor.partId = viewState.activePart
  viewState.explorerDisplayParts = true
  return viewState
}

Explore.visualMode = function(viewState) {
  viewState.explorerMode = 'visual'
  viewState.selectedArrangementIndexes = [viewState.explorerCursor.sectionId - 1]
  return viewState
}

Explore.moveMarkedSectionUp = function(songState) {
  var selectedIndex = ViewState.selectedArrangementIndexes[0]

  var tmp = songState.arrangement[selectedIndex - 1]

  songState.arrangement[selectedIndex - 1] = songState.arrangement[selectedIndex]
  songState.arrangement[selectedIndex] = tmp

  return songState
}
