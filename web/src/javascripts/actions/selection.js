window.Selection = {}

Selection.getSelectedNotes = function gsn(songState) {
  var notes = null;

  if(ViewState.activePartView(State.view()).visuallySelectedNotes) {
     notes = ViewState.activePartView(State.view()).visuallySelectedNotes;
  } else {
     notes = SongState.currentGroupNotes(songState);
  }

  return notes;
}
