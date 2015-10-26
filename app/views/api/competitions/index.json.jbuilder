json.array! @competitions do |competition|
  json.extract! competition, :name, :location, :description,
                             :competition_owner_id, :id, :profile_pic_url,
                             :color1, :color2
  json.set! :established, competition.created_at.strftime("%B %e, %Y")
  json.set! :interestName, @interest ? @interest.name : ""
  json.set! :currentUserIsJoined, current_user.competition_ids.include?(competition.id)
end
