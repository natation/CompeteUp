class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      render_errors(["Invalid email or password. Please try again."], true, true)
      render :new
    end
  end

  def destroy
    logout!(current_user)
    render_info(["Sucessfully logged out"], false)
    render json: {}
  end

  def new
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
