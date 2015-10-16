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

  def destroy
    @interest = Interest.find_by_name(params[:name])
    if @interest.present?
      new_interest_ids = current_user.interest_ids - [@interest.id]
      current_user.interest_ids = new_interest_ids
      render json: {responseJSON: "Interest #{params[:name]} removed", status: 200}
    else
      render json: {responseJSON: "No such interest", status: :unprocessable_entity}
    end
  end
end
