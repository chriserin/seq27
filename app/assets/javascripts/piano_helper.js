window.Piano = {}

Piano.sharpForNumber = function(pitchNumber) {
  var modPitch = pitchNumber % 12

  var pitches = {
    0: '',
    1: 'sharp',
    2: '',
    3: 'sharp',
    4: '',
    5: '',
    6: 'sharp',
    7: '',
    8: 'sharp',
    9: '',
    10:  'sharp',
    11:  ''
  }

  return pitches[modPitch]
}

Piano.cPitch = function(pitchNumber) {
  return ((pitchNumber % 12) == 0) ? 'c' : ''
}

Piano.octave = function(pitchNumber) {
  return `octave${Math.round(pitchNumber / 12)}`
}

Piano.cOctave = function(pitchNumber) {
  if (pitchNumber % 12 == 0) {
    return Math.round(pitchNumber / 12)
  } else {
    return ''
  }
}
