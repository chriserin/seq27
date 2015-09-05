window.SeqCom = window.SeqCom || {}

SeqCom.Part = React.createClass({
  render: function() {
    notes_html = this.props.data.notes.map(function(note, i) {
      return <note key={i} data-start={note.start} data-pitch={note.pitch} data-length={note.length}/>;
    });

    return <part data-part-id={this.props.partId}>
      <notesGrid>{notes_html}</notesGrid>
      <cursorGrid>
        <cursor
          data-start={ViewState.cursor['start']}
          data-pitch={ViewState.cursor['pitch']}
          data-length={ViewState.cursor['length']}
        />
      </cursorGrid>
      <commandLine>{ViewState.commandResult}</commandLine>
    </part>;
  }
});

SeqCom.Section = React.createClass({
  render: function() {
    var part = SongState.activePart()
    var parts_html = <SeqCom.Part data={part} partId={ViewState.activePart}/>;

    return <songSection data-section-id={ViewState.activeSection}>{parts_html}</songSection>;
  }
});


SeqCom.Song = React.createClass({
  render: function() {
    var innerComponent = <SeqCom.Section/>
    if (ViewState.mode === "explorer") {
      innerComponent = <SeqCom.Explorer/>
    }
    return <song>{innerComponent}</song>;
  }
});
