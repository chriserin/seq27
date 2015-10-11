window.Groups = {}

Groups.setSelectedTag = function(viewState) {
  viewState.sections[viewState.activeSection].parts[viewState.activePart].selectedTag = SongState.latestTag(SONG_STATE)
  return viewState
}

Groups.selectNextGroup = function(viewState) {

  var currentTag = ViewState.selectedTag()
  var tags = SongState.activePartTags()
  var currentTagIndex = tags.indexOf(currentTag)

  var nextTagIndex = currentTagIndex
  if (currentTagIndex + 1 < tags.length) {
    nextTagIndex = currentTagIndex + 1
  }

  viewState.sections[viewState.activeSection].parts[viewState.activePart].selectedTag = tags[nextTagIndex]
  return viewState
}

Groups.selectPreviousGroup = function(viewState) {
  var currentTag = ViewState.selectedTag()
  var tags = SongState.activePartTags()
  var currentTagIndex = tags.indexOf(currentTag)

  var nextTagIndex = currentTagIndex
  if (currentTagIndex - 1 > -1) {
    nextTagIndex = currentTagIndex - 1
  }

  viewState.sections[viewState.activeSection].parts[viewState.activePart].selectedTag = tags[nextTagIndex]
  return viewState
}
