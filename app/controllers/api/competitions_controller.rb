class Api::CompetitionsController < ApplicationController
  def create
    @competition = Competition.new(competition_params.merge(
                      {competition_owner_id: current_user.id}))
    if @competition.save
      current_user.competition_ids += [@competition.id]
      render json: {responseJSON: "Competition #{params[:name]} created!", status: 200}
    else
      render json: @competition.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    query = params[:query]
    if query.present?
      if query[:searchText]
        @competitions = Competition.where("lower(name) ~ ?",
                                          query[:searchText].downcase)
      elsif query[:getCurrentUserJoinedCompetitions]
        @competitions = current_user.competitions
      end
    else
      @competitions = Competition.all.take(9)
    end
  end

  def show
  end

  def update
  end

  private
  def competition_params
    params.require(:competition).permit(:location, :name,
      :description, :profile_pic_url, interest_ids: [])
  end
end
