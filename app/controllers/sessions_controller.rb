class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      render_info(["Invalid email or password. Please try again."])
      render :new
    end
  end

  def destroy
    logout!(current_user)
    render_info(["Sucessfully logged out"])
    redirect_to new_session_url
  end

  def new
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
