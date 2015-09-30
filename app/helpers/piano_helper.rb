module PianoHelper
  def sharpForNumber(pitchNumber)
    modPitch = pitchNumber % 12

    pitches = {
      0  => '',
      1  => 'sharp',
      2  => '',
      3  => 'sharp',
      4  => '',
      5  => '',
      6  => 'sharp',
      7  => '',
      8  => 'sharp',
      9  => '',
      10 =>  'sharp',
      11 =>  ''
    }

    pitches[modPitch]
  end

  def cPitch(pitchNumber)
    pitchNumber % 12 == 0 ? 'c' : ''
  end

  def octave(pitchNumber)
    "octave#{pitchNumber / 12}"
  end

  def cOctave(pitchNumber)
    if pitchNumber % 12 == 0
      pitchNumber / 12
    end
  end
end
