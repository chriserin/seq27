window.SeqCom = window.SeqCom || {}

SeqCom.Error = React.createClass({
  render() {
    console.log('error')
    if(ViewState.error) {
      return <span className='error'>{ViewState.error}</span>
    }
    return <span/>
  }
})

SeqCom.Command = React.createClass({
  render() {
    if(ViewState.mode === 'command') {
       var command =  ':' + ViewState.commandBuffer.join('')
       return <span>{command}</span>
    }
    return <span/>
  }
})

SeqCom.Result = React.createClass({
  render() {
    console.log('result')
    return <span>{ViewState.commandResult}</span>
  }
})

SeqCom.Report = React.createClass({
  render() {
    if(ViewState.reportItems) {
      var items = ViewState.reportItems.map(function(item, i) { return <p key={i}><span className='lefttab'>{item}</span></p>})
      return <report>
        <span>{ViewState.reportTitle}</span>
        {items}
        <p>
          <span className='lefttab'>Press ENTER to continue</span>
        </p>
      </report>
    }
    return <span/>
  }
})

SeqCom.CommandLine = React.createClass({
  render() {
    return <commandLine>
      <SeqCom.Error/>
      <SeqCom.Command/>
      <SeqCom.Result/>
      <SeqCom.Report/>
    </commandLine>
  }
})
