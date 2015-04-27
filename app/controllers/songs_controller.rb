class SongsController < ApplicationController
  helper_method :songs

  private

  def songs
    current_user.songs
  end
end
