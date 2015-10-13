Rails.application.routes.draw do
  namespace :api do
  get 'interests/index'
  end

  namespace :api do
  get 'events/index'
  end

  namespace :api do
  get 'events/show'
  end

  namespace :api do
  get 'competitions/create'
  end

  namespace :api do
  get 'competitions/index'
  end

  namespace :api do
  get 'competitions/show'
  end

  namespace :api do
  get 'competitions/update'
  end

  root "static_pages#index"
  resources :static_pages, only: [:index]
  resources :users, only: [:create, :new]
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
