class Api::CompetitionsController < ApplicationController
  def create
    join_competition = params[:joinCompetition]
    if (join_competition)
      current_user.competition_ids =
        (current_user.competition_ids + [join_competition[:id]]).uniq
      render json: {responseJSON: "Competition joined!", status: 200}
    else
      @competition = Competition.new(competition_params.merge(
                        {competition_owner_id: current_user.id}))
      if @competition.save
        current_user.competition_ids += [@competition.id]
        render json: {responseJSON: "Competition #{params[:name]} created!", status: 200}
      else
        render json: @competition.errors.full_messages, status: :unprocessable_entity
      end
    end
  end

  def index
    query = params[:query]
    if query.present?
      if query[:searchTextByName]
        @competitions = Competition.where("lower(name) ~ ?",
                                          query[:searchTextByName].downcase)
      elsif query[:searchTextByInterest]
        interests = Interest.where("lower(name) = ?",
                                   query[:searchTextByInterest].downcase)
        @competitions = interests.first.competitions
      elsif query[:getCurrentUserJoinedCompetitions]
        @competitions = current_user.competitions
      elsif query[:getCurrentCompetition]
        @competitions = Competition.where("id = ?", query[:getCurrentCompetition])
      elsif query[:suggestionFor]
        competition = Competition.find(query[:suggestionFor])
        @competitions = competition.getCompetitionSuggestions
      end
    else
      @competitions = Competition.limit(100).order("RANDOM()")
    end
  end

  def show
    @competition = Competition.find(params[:id])
  end

  def update
  end

  private
  def competition_params
    params.require(:competition).permit(:location, :name,
      :description, :profile_pic_url, interest_ids: [])
  end
end
