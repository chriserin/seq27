window.Save = {}

Save.write = function(songState) {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.history.pushState({}, 'Song', `${this.responseText}`)
      VIEW_STATE.commandResult = 'written'
      SONG_STATE.id = this.responseText
    }
  }

  xhr.open('post', '/songs.json', false)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({song: songState}))

  return songState
}

Save.update = function(songState) {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.history.pushState({}, 'Song', `${this.responseText}`)
      SONG_STATE.id = this.responseText
      VIEW_STATE.commandResult = 'updated'
    }
  }

  xhr.open('PATCH', `/songs/${SONG_STATE.id}.json`, false)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({song: songState}))

  return songState
}
