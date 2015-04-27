var Part = React.createClass({

  render: function() {
    notes_html = this.props.song.notes.map(function(note) {
      return <note key='{note.id}'/>;
    });

    return <notesGrid>{notes_html}</notesGrid>;
  }
});
