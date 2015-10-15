class Api::CompetitionsController < ApplicationController
  def create
  end

  def index
    query = params[:query]
    if query.present?
      if query[:searchText]
        @competitions = Competition.where("name ~ ?", query[:searchText])
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
end
