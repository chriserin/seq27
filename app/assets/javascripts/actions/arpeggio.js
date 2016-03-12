window.Arpeggio = {}

Arpeggio.create = function(songState, commandWithArguments) {
  var scaleType = commandWithArguments.split(" ")[1] || 'major';
  var part = SongState.activePart();

  var arpeggioPattern = createArpeggioPattern(scale, arpeggioNotes, groupPattern);

  part = createArpeggio(Scale.scales[scaleType], part);

  return songState;
}

function createArpeggioPattern(scaleType='major', arpeggioNotesStr='123', groupPattern='u') {
  var scale = Scale.scales[scaleType];

  var arpeggioNotes = arpeggioNotesStr.split('').map(function(x) { return parseInt(x) - 1;});

  let intervals = [];

  var groupPatternArray = groupPattern.split('')

  for(let groupDir of groupPatternArray) {
    if (groupDir === 'u') {
      intervals = Array.prototype.concat.apply(intervals, _.at(scale, arpeggioNotes));
    } else if (groupDir === 'd') {
      let reversedNotes = arpeggioNotes.slice(0).reverse();
      intervals = Array.prototype.concat.apply(intervals, _.at(scale, reversedNotes));
    }
  }

  return intervals;
}

function createArpeggio(arpeggioPatten, part) {
  var cursor = ViewState.cursor
  var nextPosition = cursor.start

  var noteLength = 96;

  var newNotes = arpeggioPattern.map(function(interval) {
    var note = SongState.newNote(nextPosition, cursor.pitch + interval, noteLength)
    nextPosition += 96;
    return note;
  })

  SongState.tagNotes(newNotes)

  Array.prototype.push.apply(part.notes, newNotes)

  return part
}
