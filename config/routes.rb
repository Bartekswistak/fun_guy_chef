Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'users#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'new_ingredient_form', to: 'recipes#new_ingredient_form'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]
  resources :users
  resources :ingredients
  resources :recipes
  root to: "home#show"

end





#Rails.application.routes.draw do

#  get 'home/show'
#  root 'sessions#home'
#  get '/login' => 'sessions#new'
#  get '/signup' => 'users#new'
#  post '/signup' => 'users#new'
#  get 'users/show' => 'users#show'
#  delete "/signout" => "users#destroy"


#  resources :ingredients
#  resources :recipes
#  resources :users

#end
