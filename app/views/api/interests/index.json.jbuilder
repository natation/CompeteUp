json.array! @interests do |interest|
  json.extract! interest, :name, :id
end
