window.Groups = {}

Groups.setSelectedTag = function(viewState, songState) {
  viewState.sections[viewState.activeSection].parts[viewState.activePart].selectedTag = SongState.latestTag(songState);
  return viewState;
}

Groups.selectNextGroup = function(viewState, songState) {

  var currentTag = ViewState.selectedTag(viewState);
  var tags = SongState.activePartTags(songState);
  var currentTagIndex = tags.indexOf(currentTag);

  var nextTagIndex = currentTagIndex;
  if (currentTagIndex + 1 < tags.length) {
    nextTagIndex = currentTagIndex + 1;
  }

  viewState.sections[viewState.activeSection].parts[viewState.activePart].selectedTag = tags[nextTagIndex];
  return viewState;
}

Groups.selectPreviousGroup = function(viewState, songState) {
  var currentTag = ViewState.selectedTag(viewState);
  var tags = SongState.activePartTags(songState);
  var currentTagIndex = tags.indexOf(currentTag);

  var nextTagIndex = currentTagIndex;

  if (currentTagIndex === -1) {
    var tagsBeforeCurrentTag = tags.filter(function(tag) { return tag < currentTag; });
    const nextTag = tagsBeforeCurrentTag[tagsBeforeCurrentTag.length - 1];
    nextTagIndex = nextTag ? tags.indexOf(nextTag) : 0;
  } else if (currentTagIndex - 1 > -1) {
    nextTagIndex = currentTagIndex - 1;
  }

  viewState.sections[viewState.activeSection].parts[viewState.activePart].selectedTag = tags[nextTagIndex];
  return viewState;
}
