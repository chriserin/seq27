Rails.application.routes.draw do
  get 'ui(/:action)', controller: 'ui' unless Rails.env.production?

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  get 'signin' => 'sessions#new'
  post 'signin' => 'sessions#create'

  root 'songs#index'

  resources :songs, only: [:index, :show, :new]

  if Rails.env.test?
    get 'js_spec' => 'test#js_spec'
  end
end
