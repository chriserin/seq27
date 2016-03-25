window.Velocity = {}

Velocity.applyVelocity = function(songState, velocityArg) {

  const notes = Selection.getSelectedNotes(songState).slice(0)
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start})
  const velocities = velocityArg.split(',')

  function applyVelocityToNextNote(sortedNotes, velocities, velocityIndex=0) {

    let nextNote = sortedNotes.shift();

    if (!(velocities[velocityIndex])) {
      velocityIndex = 0;
    }


    if (nextNote) {
      nextNote.velocity = velocities[velocityIndex];
      return applyVelocityToNextNote(sortedNotes, velocities, velocityIndex + 1);
    } else {
      return null;
    }
  }

  applyVelocityToNextNote(sortedNotes, velocities);

  return songState;
}
