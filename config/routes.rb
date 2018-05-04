Rails.application.routes.draw do

  root 'sessions#home'
  get '/login' => 'sessions#new'
  get '/signup' => 'users#new'
  get 'users/show' => 'users#show'
  delete "/signout" => "users#destroy"


  resources :ingredients
  resources :recipes
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
