window.SeqCom = window.SeqCom || {}

SeqCom.Error = React.createClass({
  render() {
    if(ViewState.error) {
      return <span className='error'>{ViewState.error}</span>
    }
    return <span/>
  }
})

SeqCom.Command = React.createClass({
  render() {
    if(ViewState.mode === 'command') {
       var command =  ':' + ViewState.commandBuffer.join('');
       return (
         <input id='commandLineInput' type='text' name='commandline' value={command} readOnly={true} style={{width: '600px'}}></input>
       );
    }
    return <span/>
  }
})

SeqCom.Result = React.createClass({
  render() {
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

SeqCom.PartialSequence = React.createClass({
  render() {
    if(NormalMode.sequence) {
      return <partialSequence>{NormalMode.totalSequence}</partialSequence>
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
      <SeqCom.PartialSequence/>
    </commandLine>
  }
})
