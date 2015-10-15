class Api::InterestsController < ApplicationController
  def index
    query = params[:query]
    if query.present?
      if query[:getCurrentUserInterests]
        @interests = Interest.joins(:user_interests, :users)
                             .where("users.id = ?", current_user.id)
        @interests = current_user.interests
      end
    else
      @interests = Interest.all.take(20)
    end
  end
end
