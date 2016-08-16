window.Instrument = {}

Instrument.addInstrument = function(songState, viewState, output, channel, instrumentName) {

  const instruments = JSON.parse(localStorage.getItem('instruments')) || {};
  instruments[instrumentName] = {output: output, channel: channel};

  const outputIndex =  Midi.indexFor(output);
  console.log("output index is " + outputIndex);

  if (outputIndex > 0) {
    localStorage.setItem('instruments', JSON.stringify(instruments));
    return songState;
  } else {
    return SeqError.noMidiNamed(output);
  }
}

Instrument.setInstrument = function(songState, viewState, instrumentName) {

  const instruments = JSON.parse(localStorage.getItem('instruments'));

  const instrument = instruments[instrumentName];

  const outputIndex = Midi.indexFor(instrument.output);

  if (outputIndex > 0) {
    SongState.activePart(songState, viewState).output = outputIndex;
    SongState.activePart(songState, viewState).channel = parseInt(instrument.channel);

    return songState;
  } else {
    return SeqError.noMidiNamed(instrument.output);
  }
}

Instrument.addTemplate = function(songState, viewState, templateName) {
  const instrumentNames = Array.prototype.slice.call(arguments).slice(3, arguments.length);

  const instruments = JSON.parse(localStorage.getItem('instruments')) || {};

  const templates = JSON.parse(localStorage.getItem('templates')) || {};

  templates[templateName] = instrumentNames;

  localStorage.setItem('templates', JSON.stringify(templates));

  return songState;
}

Instrument.applyTemplate = function(songState, viewState, templateName) {
  console.log('applying template');
  const activeSection = SongState.activeSection(songState);
  const parts = activeSection.parts;

  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  const instruments = JSON.parse(localStorage.getItem('instruments')) || {};
  const templateInstruments = templates[templateName];

  console.log('possibleInstruments ' + JSON.stringify(instruments));

  for(let i = 0; templateInstruments.length > i; i++) {
    console.log('applying instrument ' + templateInstruments[i]);
    let instrument = instruments[templateInstruments[i]];
    let outputIndex = Midi.indexFor(instrument.output);

    if(activeSection.parts[i]) {
      console.log('applying instrument to part' + i);
      parts[i].output = outputIndex;
      parts[i].channel = parseInt(instrument.channel);
    } else {
      console.log('applying instrument to new part' + i);
      songState = Song.setPart(songState, viewState, i + '!');
      let changedSection = SongState.activeSection(songState);

      changedSection.parts[i].output = outputIndex;
      changedSection.parts[i].channel = parseInt(instrument.channel);
    }
  }

  return songState;
}

Instrument.initAddedPartViews = function(viewState, songState) {
  viewState = ViewState.initPartViewForSection(viewState, viewState.activeSection);
  return viewState;
}
