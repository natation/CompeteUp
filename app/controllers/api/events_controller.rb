class Api::EventsController < ApplicationController
  def index
    query = params[:query]
    if query.present?
      if query[:competition_id]
        @events = Event.where("competition_id = ?", query[:competition_id])
      end
    end
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: {responseJSON: "Event #{event_params[:name]} created!", status: 200}
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def event_params
    params.require(:event).permit(:name, :description, :competition_id)
  end
end
