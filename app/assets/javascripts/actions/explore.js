window.Explore = {}

Explore.enterExploreMode = function(viewState) {

  viewState.mode = "explorer"
  viewState.explorerCursor.arrangementIndex = SongState.activeArrangementIndex()
  viewState.explorerCursor.partId    = viewState['activePart']

  return viewState;
}

Explore.moveCursorUp = function(viewState) {
  var explorerCursor = viewState['explorerCursor']

  if (explorerCursor.arrangementIndex === 0 && explorerCursor.partId === 0) {
    return viewState
  }

  if (explorerCursor.partId > 0) {
    explorerCursor.partId = explorerCursor.partId - 1
  } else {
    explorerCursor.arrangementIndex = explorerCursor.arrangementIndex - 1
    explorerCursor.partId = SongState.activeSection().parts.length
  }

  return viewState
}

Explore.moveCursorDown = function(viewState) {
  var explorerCursor = viewState['explorerCursor']
  var maxParts = SongState.activeSection().parts.length
  var lastArrangementIndex = SONG_STATE.arrangement.length - 1

  if (explorerCursor.arrangementIndex === lastArrangementIndex && explorerCursor.partId === maxParts) {
    return viewState
  }

  if (explorerCursor.partId < maxParts && ViewState.explorerDisplayParts) {
    explorerCursor.partId = explorerCursor.partId + 1
  } else {
    explorerCursor.arrangementIndex = explorerCursor.arrangementIndex + 1
    explorerCursor.partId = 0
  }

  return viewState
}

Explore.goToPartOrSection = function(viewState) {
  var explorerCursor = viewState['explorerCursor']

  if (explorerCursor.partId === 0) {
    viewState.activePart = 1
  } else {
    viewState.activePart = explorerCursor.partId
  }
  viewState.activeSection = SONG_STATE.arrangement[explorerCursor.arrangementIndex]

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
  viewState.selectedArrangementIndexes = [viewState.explorerCursor.arrangementIndex]
  return viewState
}

Explore.normalMode = function(viewState) {
  viewState.explorerMode = 'normal'
  viewState.selectedArrangementIndexes = []
  return viewState
}

Explore.moveMarkedSectionUp = function(songState) {
  var selectedIndex = ViewState.selectedArrangementIndexes[0]

  var swapTmp = songState.arrangement[selectedIndex - 1]
  songState.arrangement[selectedIndex - 1] = songState.arrangement[selectedIndex]
  songState.arrangement[selectedIndex] = swapTmp

  return songState
}
