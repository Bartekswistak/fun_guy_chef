Rails.application.routes.draw do

  root to: 'recipes#home'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  delete '/signout' => 'sessions#destroy'
  get 'auth/google_oauth2/callback' => 'sessions#create'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  resources :users
  resources :recipes

end
