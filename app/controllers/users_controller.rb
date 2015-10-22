class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to root_url
    else
      @interests = Interest.all
      render_errors(@user)
      render :new
    end
  end

  def index
  end

  def new
    @user = User.new
    @interests = Interest.all
  end

  def show
    if user_params && user_params[:showUserById]
      @user = User.find(user_params[:showUserById])
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render json: {responseJSON: "User update successful", status: 200}
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :bio,
                                 :location, :profile_pic_url, :showUserById,
                                 interest_ids: [])
  end
end
