json.events do
  json.array! @events do |event|
    json.extract! event, :name, :description
  end
end

json.competitionIsJoined (@competition.user_ids.include?(current_user.id))
