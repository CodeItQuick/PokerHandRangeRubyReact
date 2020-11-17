Rails.application.routes.draw do
  # resources :users
  # resources :hand_ranges
  # resources :hand_range_folders
  # resources :hand_range_groups
  # resource :users, only: [:create]
   resources :application
   post "/api/private", to: "private#private"
   post "/api/private/insert", to: "private#insert_scenario"
   post "/api/private/get-scenario", to: "private#get_scenario"
   post "/api/private/get-all-scenario", to: "private#get_all_scenario"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
