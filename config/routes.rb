Rails.application.routes.draw do
  root "sessions#new"
  resources :static_pages, only: [:index]
  resources :users, only: [:create, :new]
  resource :session, only: [:create, :destroy, :new]
end
