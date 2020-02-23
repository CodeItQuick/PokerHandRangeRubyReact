Rails.application.routes.draw do
  resources :users
  resources :hand_ranges
  resources :application
  resource :users, only: [:create]
   get "/hand_ranges/show_user_id/:user_id", to: "hand_ranges#show_user_id"
   post "/login", to: "auth#login"
   get "/auto_login", to: "auth#auto_login"
   get "/user_is_authed", to: "auth#user_is_authed"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
