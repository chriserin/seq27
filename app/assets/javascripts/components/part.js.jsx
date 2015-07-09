var Part = React.createClass({
  render: function() {
    notes_html = this.props.data.notes.map(function(note, i) {
      return <note key={i} data-start={note.start} data-pitch={note.pitch} data-length={note.length}/>;
    });

    return <part>
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

var Section = React.createClass({
  render: function() {
    parts_html = window.SONG_STATE.song.sections[0].parts.map(function(part, i) {
      return <Part key={i} data={part}/>;
    });

    return <section>{parts_html}</section>;
  }
});
