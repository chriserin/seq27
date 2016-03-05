class HomeController < ApplicationController
  helper_method def saved_songs
    if current_user
      current_user.songs
    else
      []
    end
  end
end
