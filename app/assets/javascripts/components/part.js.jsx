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
    var parts_html = <SeqCom.Part data={part} partId={ViewState.active_part}/>;

    return <songSection data-section-id={ViewState.active_section}>{parts_html}</songSection>;
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

SeqCom.Explorer = React.createClass({
  render: function() {
    var sections_html = SongState.arrangedSections().map(function(sectionValues, i) {
      sectionIndex = sectionValues[0]
      section = sectionValues[1]
      return <SeqCom.Explorer.Section key={i} section={section} id={sectionIndex+1}/>
    });
    return <explorer>{sections_html}</explorer>;
  }
});

SeqCom.Explorer.Section = React.createClass({
  isCursorOnPart: function(sectionId, partId) {
    var explorerCursor = ViewState.explorerCursor
    return (explorerCursor['sectionId'] === sectionId && explorerCursor['partId'] === partId);
  },
  isCursorOnSection: function(sectionId) {
    var explorerCursor = ViewState.explorerCursor
    return (explorerCursor['sectionId'] === sectionId && explorerCursor['partId'] <= 0);
  },
  classes: function() {
    if(this.isCursorOnSection(this.props.id)) {
      return "cursor"
    }
  },
  renderParts(sectionId) {
    var parts_html = ''

    if (ViewState.explorerDisplayParts) {
      parts_html = this.props.section.parts.map((part, i)=> {
        return <SeqCom.Explorer.Part key={i} id={i+1} isCursorOnPart={this.isCursorOnPart(sectionId, i+1)}/>;
      })
    }

    return parts_html
  },
  render: function() {
    var sectionId = this.props.id
    return <songSection data-id={this.props.id} className={this.classes()} data-id={sectionId}>{this.renderParts(sectionId)}</songSection>
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
