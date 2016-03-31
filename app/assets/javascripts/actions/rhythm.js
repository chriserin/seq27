window.Rhythm = {}

Rhythm.applySpacing = function(songState, spacing) {

  const notes = Selection.getSelectedNotes(songState).slice(0)
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start})

  const startAnchor = sortedNotes[0].start

  function nextSpace(originalSpacing, spacingIndex=0) {
    const remainingSpacing = originalSpacing.slice(spacingIndex)
    const nextX = remainingSpacing.indexOf('x')

    let start = spacingIndex;

    let endOfDescriptionIndex = nextX;
    let nextSpacingIndex = endOfDescriptionIndex + spacingIndex;
    let trailingDescription = '';

    if (nextX === 0) {
      return {ticks: 0, spacingIndex: spacingIndex + 1};
    } else if (nextX === -1) {
      wrappedX = originalSpacing.indexOf('x');
      if (wrappedX === 0) {
        start = 0
        nextSpacingIndex = 0
      } else {
        start = 0
        nextSpacingIndex = wrappedX
      }
      trailingDescription = remainingSpacing;
    }

    const end = nextSpacingIndex;

    const durationDescription = trailingDescription + originalSpacing.slice(start, end);

    return { ticks: parse(durationDescription.split('')), spacingIndex: nextSpacingIndex + 1};
  }

  function applySpacingToNextNote(sortedNotes, spacing, ticksCursor, spacingIndex=0) {

    let nextNote = sortedNotes.shift();
    if (nextNote) {
      ({ ticks, spacingIndex: nextSpacingIndex } = nextSpace(spacing, spacingIndex));
      nextNote.start = ticksCursor + ticks;
      return applySpacingToNextNote(sortedNotes, spacing, nextNote.start, nextSpacingIndex);
    } else {
      return null;
    }
  }

  applySpacingToNextNote(sortedNotes, spacing, startAnchor);

  return songState;
}

Rhythm.applyDurations = function(songState, durations) {
  const notes = Selection.getSelectedNotes(songState).slice(0)
  const sortedNotes = notes.sort(function(a, b) { return a.start - b.start})
  const splitDurations = durations.split(',');

  function applyDurationToNextNote(sortedNotes, durations, durationIndex=0) {

    let nextNote = sortedNotes.shift();

    if (!(splitDurations[durationIndex])) {
      durationIndex = 0;
    }

    if (nextNote) {
      nextNote.length = parse(durations[durationIndex].split(''));

      return applyDurationToNextNote(sortedNotes, durations, durationIndex + 1);
    } else {
      return null;
    }
  }

  applyDurationToNextNote(sortedNotes, splitDurations);

  return songState;
}

function parse(description, total=0) {
  const nextChar = description.shift();

  if(nextChar === undefined) {
    return total;
  } else if (nextChar === '.') {
    return parse(description, total + total / 2);
  } else {
    return parse(description, total + ticksValue(nextChar));
  }
}

function ticksValue(char) {
  switch(char) {
    case '1':
      return 96;
    case '2':
      return 96 / 2;
    case '3':
      return 96 / 3;
    case '4':
      return 96 / 4;
    case 'w':
      return 96 * 4;
    case 'h':
      return 96 * 2;
    default:
      return parseInt(char);
  }
}
