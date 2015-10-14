json.array! @competitions do |competition|
  json.extract! competition, :name, :location, :description, :competition_owner_id
end
