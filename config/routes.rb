Rails.application.routes.draw do
  get 'ui(/:action)', controller: 'ui' unless Rails.env.production?

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  get 'signin' => 'sessions#new'
  post 'signin' => 'sessions#create'
  delete 'signout' => 'sessions#destroy'

  root 'home#show'

  get '/songs/current' => 'songs#current'
  resources :songs, only: [:index, :show, :new, :create, :update]

  if Rails.env.test? or Rails.env.development?
    get 'js_spec' => 'test#js_spec'
  end
end
