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
    if (VIEW_STATE.mode === "explorer") {
      innerComponent = <SeqCom.Explorer/>
    }
    return <song>{innerComponent}</song>;
  }
});

SeqCom.Explorer = React.createClass({
  render: function() {
    var sections_html = SONG_STATE.song.sections.map(function(section, i) {
      return <SeqCom.Explorer.Section key={i} section={section} id={i+1}/>
    });
    return <explorer>{sections_html}</explorer>;
  }
});

SeqCom.Explorer.Section = React.createClass({
  isCursorOnPart: function(sectionId, partId) {
    var explorerCursor = VIEW_STATE['explorerCursor']
    return (explorerCursor['sectionId'] === sectionId && explorerCursor['partId'] === partId);
  },
  isCursorOnSection: function(sectionId) {
    var explorerCursor = VIEW_STATE['explorerCursor']
    return (explorerCursor['sectionId'] === sectionId && explorerCursor['partId'] <= 0);
  },
  classes: function() {
    if(this.isCursorOnSection(this.props.id)) {
      return "cursor"
    }
  },
  render: function() {
    var sectionId = this.props.id
    var parts_html = this.props.section.parts.map((part, i)=> {
      return <SeqCom.Explorer.Part key={i} id={i+1} isCursorOnPart={this.isCursorOnPart(sectionId, i+1)}/>;
    })
    return <songSection data-id={this.props.id} className={this.classes()} data-id={sectionId}>{parts_html}</songSection>
  }
});

SeqCom.Explorer.Part = React.createClass({
  classes: function() {
    if(this.props.isCursorOnPart) {
      return "cursor"
    }
  },
  render: function() {
    return <part data-id={this.props.id} className={this.classes()}></part>
  }
});
