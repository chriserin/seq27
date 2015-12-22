window.SeqCom = window.SeqCom || {}

SeqCom.Explorer = React.createClass({
  componentWillUnmount() {
    var view = this.explorerView
    setTimeout(function() {view.dispose()}, 1)
  },
  componentDidMount() {
    this.explorerView = Elm.embed(Elm.ExplorerView, ReactDOM.findDOMNode(this.refs.explorerEmbed), { initState: this.addIds(SONG_STATE), coordinates: Explore.currentCoordinates() })

    this.explorerView.ports.activePart.subscribe((coordinates) => {
      Controller.execute([NOOP, function(viewState) { return Explore.goToPartOrSection(viewState, coordinates)}])
    })
  },
  addIds(songState) {
    var newState = JSON.parse(JSON.stringify(songState))
    newState.sections.forEach((section, index) => {
      section.id = index
      section.name = index.toString()
      section.parts.forEach((part, pindex) => {
        part.id = pindex
        part.sectionId = index
        part.name = pindex.toString()
      })
    })
    return newState
  },
  render: function() {
    return <div ref="explorerEmbed"> </div>;
  }
});
