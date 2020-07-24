Rails.application.routes.draw do
  resources :users
  resources :hand_ranges
  resources :hand_range_folders
  resources :hand_range_groups
  resources :application
  resource :users, only: [:create]
   get "/hand_ranges/show_user_id/:user_id", to: "hand_ranges#show_user_id"
   post "/login", to: "auth#login"
   get "/auto_login", to: "auth#auto_login"
   get "/persist", to: "auth#persist"
   post "/api/public", to: "public#public"
   get "/api/private", to: "private#private_scoped"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
