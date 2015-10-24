class Api::EventsController < ApplicationController
  def index
    query = params[:query]
    if query.present?
      if query[:competition_id]
        @events = Event.where("competition_id = ?", query[:competition_id])
      end
    end
  end

  def show
  end
end
