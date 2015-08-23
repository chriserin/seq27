window.Explore = {}

Explore.enterExploreMode = function(viewState) {
  viewState.mode = "explorer"
  viewState.explorerCursor = {'sectionId': viewState['active_section'], 'partId': viewState['active_part']}
  return viewState;
}

Explore.moveCursorUp = function(viewState) {
  var explorerCursor = viewState['explorerCursor']

  if (explorerCursor.partId > 0) {
    explorerCursor.partId = explorerCursor.partId - 1
  } else {
    explorerCursor.sectionId = explorerCursor.sectionId - 1
    explorerCursor.partId = SongState.activeSection().parts.length
  }

  return viewState
}
