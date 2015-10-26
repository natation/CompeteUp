json.array! @competitions do |competition|
  json.extract! competition, :name, :location, :description,
                             :competition_owner_id, :profile_pic_url, :id
  json.set! :established, competition.created_at.strftime("%B %e, %Y")
json.set! :interestName, @interest ? @interest.name : ""
end
