window.SeqCom = window.SeqCom || {}

SeqCom.Song = React.createClass({
  render: function() {
    var innerComponent = <SeqCom.Section/>
    if (ViewState.mode === "explorer") {
      innerComponent = <SeqCom.Explorer/>
    }
    return <song>
      {innerComponent}
      <SeqCom.StatusLine/>
      <SeqCom.CommandLine/>
    </song>;
  }
});

SeqCom.Section = React.createClass({
  cursorTop() {
    return (16 * (127 - ViewState.cursor.pitch))
  },
  componentDidMount() {
    React.findDOMNode(this.refs.grids).scrollTop = (16 * (127 - (60 + 15)))
  },
  componentDidUpdate() {
    var elem = React.findDOMNode(this.refs.grids)

    var lowerDiff = this.cursorTop() - (elem.scrollTop + elem.clientHeight - (16 * 2))

    if (lowerDiff > 0) {
      if (lowerDiff <= 16) {
        elem.scrollTop = this.cursorTop() - (elem.clientHeight - (16 * 2))
      } else {
        elem.scrollTop = this.cursorTop() - (elem.clientHeight / 2)
      }
    }

    var upperDiff = (elem.scrollTop + 16) - this.cursorTop()

    if (upperDiff > 0) {
      if (upperDiff <= 16)
        elem.scrollTop = this.cursorTop() - (16)
      else
        elem.scrollTop = this.cursorTop() - (elem.clientHeight / 2)
    }
  },
  render: function() {
    var part = SongState.activePart()
    var parts_html = <SeqCom.Part data={part} partId={ViewState.activePart}/>;

    return <grids ref='grids' data-section-id={ViewState.activeSection}>
      <SeqCom.PitchGrid/>
      <SeqCom.BeatGrid beats={part.beats}/>
      <SeqCom.CursorGrid/>
      {parts_html}
    </grids>;
  }
});

SeqCom.PitchGrid = React.createClass({
  renderPitches() {
    return Array.from(Array(127).keys()).reverse().map((i)=>{
      return <pitch key={i} className={this.classes(i)}>
        <pianoKey className={this.classes(i)}>{Piano.cOctave(i)}</pianoKey>
      </pitch>
    })
  },
  classes(number) {
    return `${Piano.sharpForNumber(number)} ${Piano.cPitch(number)} ${Piano.octave(number)}`
  },
  render() {
    return <pitchGrid>
      {this.renderPitches()}
    </pitchGrid>
  }
})

SeqCom.BeatGrid = React.createClass({
  renderBeats(beats) {
    var beatsArray = Array.from(Array(parseInt(beats)).keys()).map((_, i)=> {return <beat key={i}/>})
    return beatsArray
  },
  render() {
    return <beatGrid>
      {this.renderBeats(this.props.beats)}
    </beatGrid>
  }
})

SeqCom.CursorGrid = React.createClass({
  cursorPosition(cursor) {
    return {
      top: (16 * (127 - cursor.pitch)),
      left: ((cursor.start / 96.0) * 75) + 60
    }
  },
  render() {
    var selection = ViewState.selection()
    return <cursorGrid>
      <cursor
        style={this.cursorPosition(ViewState.cursor)}
        data-start={ViewState.cursor['start']}
        data-pitch={ViewState.cursor['pitch']}
        data-length={ViewState.cursor['length']}
      />
      <SeqCom.VisualSelection left={selection.left} right={selection.right} top={selection.top} bottom={selection.bottom}/>
    </cursorGrid>
  }
})

SeqCom.Part = React.createClass({
  notePosition(note) {
    return {
      top: (16 * (127 - note.pitch)),
      left: ((note.start / 96.0) * 75) + 60,
      width: ((note.length / 96.0) * 75)
    }
  },
  render: function() {
    var notes_html = this.props.data.notes.map((note, i)=> {
      return <note
        key={i}
        style={this.notePosition(note)}
        data-start={note.start}
        data-pitch={note.pitch}
        data-length={note.length}
      />;
    });

    return <part data-part-id={this.props.partId}>
      <notesGrid>{notes_html}</notesGrid>
    </part>;
  }
});

SeqCom.StatusLine = React.createClass({
  render() {
    return <statusLine>
      <name>seq27</name>
      <filler/>
      <SeqCom.CursorPosition/>
    </statusLine>
  }
})

SeqCom.CommandLine = React.createClass({
  renderContent() {
    if(ViewState.mode === 'command') {
       return ':' + ViewState.commandBuffer.join('')
    } else {
      if (ViewState.error) {
        return <span className='error'>{ViewState.error}</span>
      }
      return ViewState.commandResult
    }
  },
  render() {
    return <commandLine>{this.renderContent()}</commandLine>
  }
})

SeqCom.CursorPosition = React.createClass({
  render() {
    var cursor = ViewState.cursor
    var part = SongState.activePart()

    return <cursorPosition>
      <span className='label'>pitch:</span>
      <span className='value'>{ cursor.pitch }</span>
      <span className='label'>beats:</span>
      <span className='value'>{Math.round(cursor.start / 96)}/{part.beats}</span>
      <span className='label'>ticks:</span>
      <span className='value'>{cursor.start % 96}</span>
    </cursorPosition>
  }
})
