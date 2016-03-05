class SongsController < ApplicationController
  helper_method :saved_songs, :song, :song_json
  layout 'sequencer'

  def create
    song = current_user.songs.create(definition: params[:song])
    respond_to do |format|
      format.json { render json: song.id }
    end
  end

  def update
    song.update_attributes(definition: params[:song])
    respond_to do |format|
      format.json { render json: song.id }
    end
  end
  private

  def song_json
    song.definition.merge({id: song.id})
  end

  def song
    current_user.songs.find params[:id]
  end

  def saved_songs
    if current_user
      current_user.songs
    else
      []
    end
  end
end
