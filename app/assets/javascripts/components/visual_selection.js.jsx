window.SeqCom = window.SeqCom || {}

SeqCom.VisualSelection = React.createClass({
  styles() {
    return {
      top: 16 * (127 - this.props.top),
      left: 60 + (75 * (this.props.left / 96)),
      height: 16 * (this.props.top - this.props.bottom + 1),
      width: (75 * (this.props.right / 96 - this.props.left / 96))
    }
  },
  render: function() {
    if (ViewState.mode === 'visual') {
      return <visualSelection
                data-left={this.props.left}
                data-right={this.props.right}
                data-top={this.props.top}
                data-bottom={this.props.bottom}
                style={this.styles()}
             >
             </visualSelection>;
    }
    else
      return <span/>
  }
})
