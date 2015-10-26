json.extract! @user || current_user, :id, :name, :email, :bio, :location,
                                      :profile_pic_url, :color1, :color2
json.set! :memberSince, current_user.created_at.strftime("%B %e, %Y")
