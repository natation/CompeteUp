class ApplicationController < ActionController::Base
  LOCATIONS = ["San Francisco, CA", "Berkeley, CA",
                  "Los Angeles, CA", "Eureka, CA"]
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  private
  def current_user
    return nil unless session[:session_token]
    @current_user || User.find_by_session_token(session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!(user)
    user.reset_session_token!
    session[:session_token] = nil
  end

  def render_info(message, now = true)
    if now
      flash.now[:info] = message
    else
      flash[:info] = message
    end
  end

  def render_errors(obj, now = true, override = false)
    if override
      if now
        flash.now[:errors] = obj if obj
      else
        flash[:errors] = obj if obj
      end
    else
      if now
        flash.now[:errors] = obj.errors.full_messages if obj
      else
        flash[:errors] = obj.errors.full_messages if obj
      end
    end
  end

  def require_login
    redirect_to new_session_url unless current_user
  end
end
