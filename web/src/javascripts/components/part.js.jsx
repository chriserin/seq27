window.SeqCom = window.SeqCom || {}

SeqCom.Song = React.createClass({
  getInitialState: function () {
    return this.props;
  },
  render: function() {
    return <song>
      <SeqCom.Section view={this.state.view} song={this.state.song}/>
      <SeqCom.StatusLine
        name={ SONG_STATE.name }
        section={ ViewState.activeSection }
        part={ ViewState.activePart }
        midiOutputName={ Midi.outputNames()[SongState.activeOutput(State.song())] }
        midiOutput={ SongState.activePart(State.song()).output }
        channel={ SongState.activePart(State.song()).channel }
        cursor={ ViewState.activePartView(State.view()).cursor }
        activePart={ SongState.activePart(State.song()) }
        />
      <SeqCom.CommandLine/>
    </song>;
  }
});

SeqCom.Section = React.createClass({
  view() {
    return this.props.view;
  },
  song() {
    return this.props.song;
  },
  cursorTop() {
    return (16 * (127 - ViewState.activePartView(this.view()).cursor.pitch))
  },
  cursorLeft() {
    return ((ViewState.activePartView(this.view()).cursor.start / 96.0) * 75) + 60
  },
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.grids).scrollTop = (16 * (127 - (ViewState.activeCursor(this.view()).pitch + 15)))
  },
  componentDidUpdate() {
    var elem = ReactDOM.findDOMNode(this.refs.grids)

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

    var leftDiff = this.cursorLeft() - (elem.scrollLeft + elem.clientWidth - (75 * 2))

    if (leftDiff > 0) {
      if (leftDiff <= 75) {
        elem.scrollLeft = this.cursorLeft() - (elem.clientWidth - (75 * 2))
      } else {
        elem.scrollLeft = this.cursorLeft() - (elem.clientWidth / 2)
      }
    }

    var rightDiff = (elem.scrollLeft + 75) - this.cursorLeft()

    if (rightDiff > 0) {
      if (rightDiff <= 75)
        elem.scrollLeft = this.cursorLeft() - (75)
      else
        elem.scrollLeft = this.cursorLeft() - (elem.clientWidth / 2)
    }
  },
  render: function() {
    var notes = SongState.notesForActivePart(this.song());
    var part = SongState.activePart(this.song());

    var parts_html = (
      <SeqCom.Part
        notes={notes}
        partId={ViewState.activePart}
        visuallySelectedNotes={ViewState.activePartView(this.view()).visuallySelectedNotes}
        selectedTag={ViewState.selectedTag(this.view())}
      />
    );

    return <grids ref='grids' data-section-id={ViewState.activeSection}>
      <SeqCom.PitchGrid beats={part.beats}/>
      <SeqCom.CursorGrid selection={ViewState.selection(this.view())} cursor={ViewState.activeCursor(this.view())}/>
      {parts_html}
    </grids>;
  }
});

SeqCom.PitchGrid = React.createClass({
  renderBeats(beats, cNote) {
    var beatsArray = Array.from(Array(parseInt(beats)).keys()).map((_, i)=> {
      var beatNumber = ''
      if(cNote) {
        beatNumber = ((i + 1) % 4 === 1 ? i + 1 : '')
      }
      return <beat key={i}>{beatNumber}</beat>
    })
    return beatsArray;
  },
  renderPitches() {
    return Array.from(Array(128).keys()).reverse().map((i)=>{
      return <pitch key={i} className={this.classes(i)}>
        <pianoKey className={this.classes(i)}>{Piano.cOctave(i)}</pianoKey>
        {this.renderBeats(this.props.beats, Piano.cOctave(i))}
      </pitch>
    })
  },
  classes(number) {
    return `${Piano.sharpForNumber(number)} ${Piano.cPitch(number)} ${Piano.octave(number)}`;
  },
  render() {
    return (
      <pitchGrid>
        {this.renderPitches()}
      </pitchGrid>
    );
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
    var selection = this.props.selection;
    var cursor = this.props.cursor;

    return <cursorGrid>
      <cursor
        style={this.cursorPosition(cursor)}
        data-start={cursor['start']}
        data-pitch={cursor['pitch']}
        data-length={cursor['length']}
      />
      <SeqCom.VisualSelection
        mode={ViewState.mode}
        left={selection.left}
        right={selection.right}
        top={selection.top}
        bottom={selection.bottom}
      />
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
  classes(note) {
    var visualNotes = this.props.visuallySelectedNotes;

    if(!visualNotes && note.timestamp === this.props.selectedTag) {
      return 'groupSelected'
    }

    if(visualNotes && visualNotes.indexOf(note) > -1) {
      return 'visualSelected'
    }
  },
  render: function() {
    var notes = this.props.notes;

    var notes_html = notes.map((note, i)=> {
      return (
        <note
          key={i}
          style={this.notePosition(note)}
          className={this.classes(note)}
          data-start={note.start}
          data-pitch={note.pitch}
          data-length={note.length}
          data-velocity={note.velocity}
        />
      );
    })

    return <part data-part-id={this.props.partId}>
      <notesGrid>{notes_html}</notesGrid>
    </part>;
  }
});

SeqCom.StatusLine = React.createClass({
  render() {
    let songName = this.props.name || 'seq27';

    return <statusLine>
      <name>{songName}</name>
      <name className="section">sect { this.props.section }</name>
      <name className="part">part { this.props.part }</name>
      <div>output {this.props.midiOutputName}({this.props.midiOutput})</div>
      <div>channel {this.props.channel}</div>
      <filler/>
      <SeqCom.CursorPosition cursor={this.props.cursor} part={this.props.activePart}/>
    </statusLine>
  }
})

SeqCom.CursorPosition = React.createClass({
  render() {
    var cursor = this.props.cursor;
    var part = this.props.part;

    return <cursorPosition>
      <span className='label'>pitch:</span>
      <span className='value'>{ cursor.pitch }</span>
      <span className='label'>beats:</span>
      <span className='value'>{Math.round(cursor.start / 96) + 1}/{part.beats}</span>
      <span className='label'>ticks:</span>
      <span className='value'>{cursor.start % 96}</span>
    </cursorPosition>
  }
})

export {};
