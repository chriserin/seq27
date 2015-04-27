class SongsController < ApplicationController
  helper_method :songs, :song, :song_json

  private

  def song_json
    song.definition
  end

  def song
    Song.find params[:id]
  end

  def songs
    current_user.songs
  end
end
