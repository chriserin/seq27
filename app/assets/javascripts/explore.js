window.Explore = {}

Explore.enterExploreMode = function(viewState) {
  viewState.mode = "explorer"
  viewState.explorerCursor = {'sectionId': viewState['active_section'], 'partId': viewState['active_part']}
  return viewState;
}

Explore.moveCursorUp = function(viewState) {
  var explorerCursor = viewState['explorerCursor']

  explorerCursor.partId = explorerCursor.partId - 1

  return viewState
}
