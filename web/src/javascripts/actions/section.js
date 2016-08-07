window.Section = {};

Section.previousSection = function(viewState, songState) {
  const currentSection = viewState.activeSection;

  if (currentSection - 1 < 0) {
    return viewState;
  } else {
    viewState.activeSection = currentSection - 1;
  }

  return viewState;
}

Section.nextSection = function(viewState, songState) {
  const currentSection = viewState.activeSection;

  if (currentSection + 1 >= viewState.sections.length) {
    return viewState;
  } else {
    viewState.activeSection = currentSection + 1;
  }

  return viewState;
}
