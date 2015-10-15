class Api::InterestsController < ApplicationController
  def index
    query = params[:query]
    if query.present?
      if query[:getCurrentUserInterests]
        @interests = current_user.interests
      elsif query[:fetchNone]
        @interests = Interest.none
      end
    else
      @interests = Interest.all.take(20)
    end
  end
end
