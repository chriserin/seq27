var Part = React.createClass({

  render: function() {
    notes_html = this.props.song.notes.map(function(note) {
      return <div className='note' key="1"/>;
    });

    return <div id='grid' > {notes_html}</div> ;
  }
});
