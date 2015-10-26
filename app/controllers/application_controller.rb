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

  protected
  def get_colors(public_id)
    cloud_attrs = {
        cloud_name: ENV["cloudinary_cloud_name"],
        api_key: ENV["cloudinary_api_key"],
        api_secret: ENV["cloudinary_api_secret"],
        colors: true
    }
    colors = {}
    if public_id
      color_arr = Cloudinary::Api.resource(public_id,
                                        cloud_attrs)["colors"].take(2)
      color_arr.each.with_index do |color_description, i|
        colors["color#{i+1}".to_sym] = color_description.first
      end
    end
    return colors
  end
end
