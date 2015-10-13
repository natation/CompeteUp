Rails.application.routes.draw do
  root "static_pages#index"
  resources :static_pages, only: [:index]
  resources :users, only: [:create, :new]
  resource :session, only: [:create, :destroy, :new]
end
