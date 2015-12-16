window.SeqCom = window.SeqCom || {}

SeqCom.Explorer = React.createClass({
  render: function() {
    var sections_html = SongState.arrangedSections().map(function(sectionValues, i) {
      sectionIndex = sectionValues[0]
      section = sectionValues[1]
      return <SeqCom.Explorer.Section key={i} arrangementIndex={i} section={section} sectionId={sectionIndex+1} />
    });
    return <explorer>
      <h1>Explorer</h1>
      {sections_html}
    </explorer>;
  }
});

SeqCom.Explorer.Section = React.createClass({
  isCursorOnSection: function(arrangementIndex) {
    var explorerCursor = ViewState.explorerCursor
    return (explorerCursor['arrangementIndex'] === arrangementIndex && explorerCursor['partId'] < 0);
  },
  isCursorOnPart: function(arrangementIndex, partId) {
    var explorerCursor = ViewState.explorerCursor
    return (explorerCursor['arrangementIndex'] === arrangementIndex && explorerCursor['partId'] === partId);
  },
  classes: function() {
    if(this.isCursorOnSection(this.props.arrangementIndex)) {
      return "cursor"
    }
  },
  renderParts(arrangementIndex) {
    var parts_html = ''

    if (ViewState.explorerDisplayParts) {
      parts_html = this.props.section.parts.map((part, i)=> {
        return <SeqCom.Explorer.Part key={i} id={i} isCursorOnPart={this.isCursorOnPart(arrangementIndex, i)}/>;
      })
    }

    return parts_html
  },
  render: function() {
    var sectionId = this.props.sectionId
    var arrangementIndex = this.props.arrangementIndex

    return <songSection
              className={this.classes()}
              data-section-id={sectionId}
              data-arrangement-index={arrangementIndex}>
                <span className={this.classes()}>section {sectionId}</span>
                {this.renderParts(arrangementIndex)}
           </songSection>;
  }
});

SeqCom.Explorer.Part = React.createClass({
  classes: function() {
    if(this.props.isCursorOnPart) {
      return "cursor"
    }
  },
  render: function() {
    return <part data-id={this.props.id} className={this.classes()}>part {this.props.id}</part>
  }
});
