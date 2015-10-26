class UsersController < ApplicationController
  def create
    colors = self.get_colors(user_params[:profile_pic_url])
    @user = User.new(user_params.merge(colors))
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
    u_params = params[:user]
    if u_params && user_params[:competition_id]
      @users = Competition.find(user_params[:competition_id]).users
    end
  end

  def new
    @user = User.new
    @interests = Interest.all
  end

  def show
    u_params = params[:user]
    if u_params && user_params[:showUserById]
      @user = User.find(user_params[:showUserById])
    end
  end

  def update
    colors = self.get_colors(user_params[:profile_pic_url])
    @user = current_user
    if @user.update(user_params.merge(colors))
      render json: {responseJSON: "User update successful", status: 200}
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :bio,
                                 :location, :profile_pic_url,
                                 :showUserById,
                                 :competition_id,
                                 interest_ids: [])
  end
end
