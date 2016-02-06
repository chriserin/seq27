window.Selection = {}

Selection.getSelectedNotes = function(songState) {
  var notes = null

  if(ViewState.activePartView().visuallySelectedNotes) {
     notes = ViewState.activePartView().visuallySelectedNotes
  } else {
     notes = SongState.currentGroupNotes(songState)
  }

  return notes
}
