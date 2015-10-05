window.Save = {}

Save.write = function(songState) {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.history.pushState({}, 'Song', `${this.responseText}`)
      VIEW_STATE.commandResult = 'written'
    }
  }

  xhr.open('post', '/songs.json', false)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({song: songState}))

  return songState
}
