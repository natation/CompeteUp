Rails.application.routes.draw do
  root "static_pages#index"
  resources :static_pages, only: [:index]
  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]
  namespace :api, defaults: {format: :json} do
    resources :competitions, only: [:create, :index, :show, :update]
    resources :events, only: [:index, :show]
    resources :interests, only: [:index]
    resources :user_interests, only: [:index]
    resources :competition_interests, only: [:index]
    resources :competition_photos, only: [:index]
  end
end
