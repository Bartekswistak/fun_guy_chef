Rails.application.routes.draw do

  root to: 'recipes#home'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  delete '/signout' => 'sessions#destroy'
  get 'auth/google_oauth2/callback' => 'sessions#create'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get '/users/:user_id/recipes' => 'users#show'
  post '/users/:user_id/recipes/new' => 'recipes#create'

  get 'recipes_sorted_by_cook_time' => 'recipes#sorted_cook_time'

  post '/recipes/:recipe_id' => 'comments#create'

  resources :users do
    resources :recipes, except: [:destroy]
  end
  resources :recipes do
    resources :comments
    post '/comments' => 'comments#create'
  end

  resources :comments, only: [:destroy]
end
