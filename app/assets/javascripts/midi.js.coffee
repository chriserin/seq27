TEST_OUTPUT = "seq27-midi-output"

window.Midi = class Midi
  OFF = 0x80
  ON = 0x90
  @connections: new Map() #YES first use of Map
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()

    midiPromise.then((access) ->
      outputIterator = access.outputs.values()
      while(output = outputIterator.next(); !output.done)
        Midi.connections.set(output.value.name, output.value)
    , ->
      console.log("midi failure")
    )

  @primaryOutput: ->
    if Midi.connections.has(TEST_OUTPUT)
      Midi.connections.get(TEST_OUTPUT)
    else
      Midi.connections.values().next().value

  @outputNames: ->
    names = []
    keys = Midi.connections.keys()
    while(output = keys.next(); !output.done)
      names.push(output.value)
    return names

  @sendOn: (channel, pitch, velocity, timeFromNow)->
    @send(ON, channel, pitch, velocity, timeFromNow)

  @sendOff: (channel, pitch, velocity, timeFromNow)->
    @send(OFF, channel, pitch, velocity, timeFromNow)

  @send: (action, channel, pitch, velocity, timeFromNow=0)->
    output = @primaryOutput()
    output.send [action ^ channel, pitch, velocity], timeFromNow
