class Api::CompetitionsController < ApplicationController
  def create
  end

  def index
    if params[:query].present?
      puts "HAHAHAHAHAHHAHAHAHAH"
      @competitions = Competition.where("name ~ ?", params[:query])
    else
            puts "BOOOOOOOOO"
      @competitions = Competition.none
    end
  end

  def show
  end

  def update
  end

  def search
    if params[:query].present?
      @competitions = Competition.where("name ~ ?", params[:query])
    else
      @competitions = Competition.none
    end
    render :index
  end
end
