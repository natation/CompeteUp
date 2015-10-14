class Api::CompetitionsController < ApplicationController
  def create
  end

  def index
    @competitions = Competition.all
  end

  def show
  end

  def update
  end
end
