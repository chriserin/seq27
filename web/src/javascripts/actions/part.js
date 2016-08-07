window.Part = {};

Part.previousPart = function(viewState, songState) {

  const currentPart = viewState.activePart;

  if (currentPart - 1 < 0) {
    return viewState;
  } else {
    viewState.activePart = currentPart - 1;
  }

  return viewState;
}

Part.nextPart = function(viewState, songState) {
  const currentPart = viewState.activePart;

  if (currentPart + 1 >= viewState.sections[0].parts.length) {
    return viewState;
  } else {
    viewState.activePart = currentPart + 1;
  }

  return viewState;
}
