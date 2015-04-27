class SongsController < ApplicationController
  helper_method :songs, :song

  private

  def song
    Songs.find params[:id]
  end

  def songs
    current_user.songs
  end
end
