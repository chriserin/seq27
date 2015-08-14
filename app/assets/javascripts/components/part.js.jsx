window.SeqCom = {}

SeqCom.Part = React.createClass({
  render: function() {
    notes_html = this.props.data.notes.map(function(note, i) {
      return <note key={i} data-start={note.start} data-pitch={note.pitch} data-length={note.length}/>;
    });

    return <part data-part-id={this.props.partId}>
      <notesGrid>{notes_html}</notesGrid>
      <cursorGrid>
        <cursor
          data-start={VIEW_STATE['cursor']['start']}
          data-pitch={VIEW_STATE['cursor']['pitch']}
          data-length={VIEW_STATE['cursor']['length']}
        />
      </cursorGrid>
      <commandLine>{VIEW_STATE['commandResult']}</commandLine>
    </part>;
  }
});

SeqCom.Section = React.createClass({
  render: function() {
    var part = SongState.activePart()
    var parts_html = <SeqCom.Part data={part} partId={window.VIEW_STATE.active_part}/>;

    return <songSection data-section-id={window.VIEW_STATE.active_section}>{parts_html}</songSection>;
  }
});


SeqCom.Song = React.createClass({
  render: function() {
    var innerComponent = <SeqCom.Section/>
    if (VIEW_STATE.isExploring) {
      innerComponent = <SeqCom.Explorer/>
    }
    return <song>{innerComponent}</song>;
  }
});

SeqCom.Explorer = React.createClass({
  render: function() {
    var sections_html = SONG_STATE.song.sections.map(function(section, i) {
      return <songSection key={i}></songSection>
    });
    return <explorer>{sections_html}</explorer>;
  }
});
