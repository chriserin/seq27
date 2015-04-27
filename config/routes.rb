Rails.application.routes.draw do

  get 'signin' => 'sessions#new'
  post 'signin' => 'sessions#create'

  root 'songs#index'

end
