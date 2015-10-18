window.Selection = {}

Selection.getSelectedNotes = function(songState) {
  var notes = null

  if(ViewState.visuallySelectedNotes) {
     notes = ViewState.visuallySelectedNotes
  } else {
     notes = SongState.currentGroupNotes(songState)
  }

  return notes
}
