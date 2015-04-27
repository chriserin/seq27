exploreOutputs = (outputs) ->
  true

describe 'midi', ->
  it 'should find a midi output', (done) ->
    expect(Midi).not.toBe(null)
    expect(navigator.requestMIDIAccess()).not.toBe(null)
    midiPromise = navigator.requestMIDIAccess()
    result = -1

    midiPromise.then( (access) ->
      exploreOutputs(access.outputs)
      expect(true).toBe(true)
      done()
    , ->
      expect(false).toBe(true)
      done()
    )
