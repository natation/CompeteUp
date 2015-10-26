cloud_attrs = {
    cloud_name: ENV["cloudinary_cloud_name"],
    api_key: ENV["cloudinary_api_key"],
    api_secret: ENV["cloudinary_api_secret"],
    colors: true
}

json.array! @competitions do |competition|
  json.extract! competition, :name, :location, :description,
                             :competition_owner_id, :id, :profile_pic_url
  json.set! :established, competition.created_at.strftime("%B %e, %Y")
  json.set! :interestName, @interest ? @interest.name : ""
  if @getColors
    color_arr = Cloudinary::Api.resource(competition.profile_pic_url,
                                      cloud_attrs)["colors"].take(2)
    colors = []
    color_arr.each do |color_description|
      colors << color_description.first
    end
    json.set! :colors, colors
  end
end
