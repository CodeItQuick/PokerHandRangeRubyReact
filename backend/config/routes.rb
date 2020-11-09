Rails.application.routes.draw do
  # resources :users
  # resources :hand_ranges
  # resources :hand_range_folders
  # resources :hand_range_groups
  # resource :users, only: [:create]
   resources :application
   get "/hand_ranges/show_user_id/:user_id", to: "hand_ranges#show_user_id"
   post "/login", to: "auth#login"
   get "/auto_login", to: "auth#auto_login"
   get "/persist", to: "auth#persist"
   post "/api/public", to: "public#public"
   post "/api/public/insert", to: "public#couchbase_insert"
   post "/api/public/get-scenario", to: "public#get_scenario"
   post "/api/public/get-all-scenario", to: "public#get_all_scenario"
   post "/api/private", to: "private#private"
   post "/api/private/get-scenario", to: "private#get_scenario"
   post "/api/private/get-all-scenario", to: "private#get_all_scenario"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
