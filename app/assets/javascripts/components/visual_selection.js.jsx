window.SeqCom = window.SeqCom || {}

SeqCom.VisualSelection = React.createClass({
  render: function() {
    return <visualSelection
              data-left={this.props.left}
              data-right={this.props.right}
              data-top={this.props.top}
              data-bottom={this.props.bottom}
           >
           </visualSelection>;
  }
})
