class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to static_pages_url
    else
      fail
      render_errors(@user)
      render :new
    end
  end

  def index
  end

  def new
    @user = User.new
    @locations = ["San Francisco, CA", "Berkeley, CA",
                    "Los Angeles, CA", "Eureka, CA"]
    @interests = Interest.all
  end

  def show
  end

  def update
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :bio, :location, interest_ids: [])
  end
end
