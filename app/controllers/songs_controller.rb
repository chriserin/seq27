class SongsController < ApplicationController
  helper_method :songs, :song, :song_json

  def create
    puts params
    song = current_user.songs.create(definition: params[:song])
    respond_to do |format|
      format.html
      format.json { render json: song.id }
    end
  end

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
