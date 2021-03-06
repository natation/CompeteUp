class Api::CompetitionsController < ApplicationController
  def create
    join_competition = params[:joinCompetition]
    if (join_competition)
      if (join_competition[:join])
        current_user.competition_ids =
          (current_user.competition_ids + [join_competition[:id].to_i]).uniq
        render json: {responseJSON: "Competition joined!", status: 200}
      else
        current_user.competition_ids = current_user.competition_ids - [join_competition[:id].to_i]
        render json: {responseJSON: "Competition removed!", status: 200}
      end
    else
      colors = self.get_colors(competition_params[:profile_pic_url])
      @competition = Competition.new(competition_params.merge(
                        {competition_owner_id: current_user.id}.merge(colors)))
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
      if query[:searchByName]
        @competitions = Competition.where("lower(name) ~ ?",
                                          query[:searchByName].downcase)
      elsif query[:searchByInterest]
        interests = Interest.where("lower(name) = ?",
                                   query[:searchByInterest].downcase)
        @interest = interests.first
        @competitions = @interest.competitions
      elsif query[:getCurrentUserJoinedCompetitions]
        @competitions = current_user.competitions
      elsif query[:getCurrentCompetition]
        if query[:getColors]
          @getColors = true;
        end
        @competitions = Competition.where("id = ?", query[:getCurrentCompetition])
      elsif query[:suggestionFor]
        competition = Competition.find(query[:suggestionFor])
        @competitions = competition.getCompetitionSuggestions
      elsif query[:getInterestCompetitions]
        @competitions = Interest.find_by_name(query[:getInterestCompetitions])
                                .competitions.limit(3).order("RANDOM()")
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
