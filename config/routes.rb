Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  get 'signin' => 'sessions#new'
  post 'signin' => 'sessions#create'

  root 'songs#index'

  resources :songs, only: [:index, :show]
end
