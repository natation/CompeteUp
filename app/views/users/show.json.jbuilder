json.extract! current_user, :name, :email, :bio, :location
json.set! :memberSince, current_user.created_at.strftime("%B %e, %Y")
