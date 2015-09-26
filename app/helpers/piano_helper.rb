module PianoHelper
  def pitchForNumber(pitchNumber)
    modPitch = pitchNumber % 12

    pitches = {
      0  => 'c',
      1  => 'cSharp',
      2  => 'd',
      3  => 'dSharp',
      4  => 'e',
      5  => 'f',
      6  => 'fSharp',
      7  => 'g',
      8  => 'gSharp',
      9  => 'a',
      10 =>  'aSharp',
      11 =>  'b'
    }

    pitches[modPitch]
  end

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
end
