json.array! @interests do |interest|
  json.extract! interest, :name
end
