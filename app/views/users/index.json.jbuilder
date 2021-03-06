json.array! @users do |user|
  json.extract! user, :id, :name, :email, :bio, :location, :profile_pic_url
  json.set! :memberSince, current_user.created_at.strftime("%B %e, %Y")
end
