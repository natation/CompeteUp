json.array! @events do |event|
  json.extract! event, :name, :description
end
