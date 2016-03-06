window.Scale = {scales: {}};

Scale.scales.major = [0, 2, 4, 5, 7, 9, 11, 12];
Scale.scales.minor = [0, 2, 3, 5, 7, 8, 10, 12];

Scale.create = function(songState, commandWithArguments) {
  var scaleType = commandWithArguments.split(" ")[1] || 'major';
  console.log("Check out this scale " + scaleType)
  var part = SongState.activePart();
  part = createScale(Scale.scales[scaleType], part);

  return songState;
}

var createScale = function(pattern, part) {
  var cursor = ViewState.cursor
  var nextPosition = cursor.start

  var noteLength = 96;

  var newNotes = pattern.map(function(interval) {
    var note = SongState.newNote(cursor.start, cursor.pitch + interval, noteLength)
    nextPosition += 96;
    return note;
  })

  SongState.tagNotes(newNotes)

  Array.prototype.push.apply(part.notes, newNotes)

  return part
}
