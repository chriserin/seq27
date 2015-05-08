var Part = React.createClass({
  render: function() {
    notes_html = window.SONG_STATE.song.notes.map(function(note, i) {
      return <note key={i} data-beat={note.beats} data-pitch={note.pitch}/>;
    });

    return <part><notesGrid>{notes_html}</notesGrid><cursorGrid><cursor data-beat={window.VIEW_STATE['cursor']['beats']} data-pitch={window.VIEW_STATE['cursor']['pitch']}/></cursorGrid></part>;
  }
});
