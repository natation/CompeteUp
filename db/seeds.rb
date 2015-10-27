
def generate_colors(public_id)
  cloud_attrs = {
      cloud_name: ENV["cloudinary_cloud_name"],
      api_key: ENV["cloudinary_api_key"],
      api_secret: ENV["cloudinary_api_secret"],
      colors: true
  }
  colors = {}
  color_arr = Cloudinary::Api.resource(public_id,
                                    cloud_attrs)["colors"].take(2)
  color_arr.each.with_index do |color_description, i|
    colors["color#{i+1}".to_sym] = color_description.first
  end
  return colors
end

locations = ["San Francisco, CA", "Berkeley, CA", "Los Angeles, CA", "Eureka, CA"]
User.create!({name: "Vic", email: "vic@vic.com", location:"San Francisco, CA",
              bio: "I'm working", password: "123456"})
User.create!({name: "Olaf", email: "olaf@frozen.com", location:"San Francisco, CA",
              bio: "I'm working", password: "123456"})

5.times do |i|
  User.create!({name: "user #{i}", email: "user#{i}@example.com",
                bio: "I'm working on #{i}", password: "123456+#{i}",
                location: locations[rand(4)]})
end

Competition.create!({name: "Basketball", location: "San Francisco, CA",
                     description: "Ball it up! Come join us for 5 on 5 every day at 7pm",
                     competition_owner_id: 1,
                     profile_pic_url: "bball_lwexne"}.merge(generate_colors("bball_lwexne")))

Competition.create!({name: "Football", location: "Berkeley, CA",
                     description: "We play flag football every Saturday!",
                     competition_owner_id: 1,
                     profile_pic_url: "fb_stadium_evenue_2013_isbzdp"}.merge(generate_colors("fb_stadium_evenue_2013_isbzdp")))

Competition.create!({name: "Soccer", location: "Berkeley, CA",
                    description: "This is the real football!",
                    competition_owner_id: 3,
                    profile_pic_url: "football-wallpaper-hd-resolution-2e8i_s3rjc8"}.merge(generate_colors("football-wallpaper-hd-resolution-2e8i_s3rjc8")))

Competition.create!({name: "AppAcademy", location: "San Francisco, CA",
                     description: "Coding all the time!",
                     competition_owner_id: 4,
                     profile_pic_url: "130314_apacademy_0077_jiik4h"}.merge(generate_colors("130314_apacademy_0077_jiik4h")))

 Competition.create!({name: "Whitewater Adventures", location: "Eureka, CA",
                      description: "We are awesome, fun, and love water!",
                      competition_owner_id: 6,
                      profile_pic_url: "rafting_t1cwim"}.merge(generate_colors("rafting_t1cwim")))
Competition.create!({name: "Gardening", location: "Los Angeles, CA",
                     description: "You can put a pitchfork in the competition, literally!",
                     competition_owner_id: 2,
                     profile_pic_url: "gardening-van-houtte-coffee_emag_article_large_eqpuxq"}.merge(generate_colors("gardening-van-houtte-coffee_emag_article_large_eqpuxq")))

Competition.create!({name: "Magic Cards", location: "San Francisco, CA",
                    description: "Magic Cards and card games every day!",
                    competition_owner_id: 1,
                    profile_pic_url: "MTG_CARDS1_anqqvo"}.merge(generate_colors("MTG_CARDS1_anqqvo")))

Competition.create!({name: "Thumb Wars", location: "Los Angeles, CA",
                    description: "Our thumbs are ripped up!",
                    competition_owner_id: 4,
                    profile_pic_url: "670px-Dominate-at-Thumb-Wars-Step-4-Version-2_w1roud"}.merge(generate_colors("670px-Dominate-at-Thumb-Wars-Step-4-Version-2_w1roud")))

Competition.create!({name: "Triathlons", location: "Berkeley, CA",
                   description: "Trying to stay away from sharks!",
                   competition_owner_id: 1,
                   profile_pic_url: "6a00d8341c630a53ef017d417b00c0970c_jjkbaz"}.merge(generate_colors("6a00d8341c630a53ef017d417b00c0970c_jjkbaz")))

Competition.create!({name: "Pogs", location: "San Francisco, CA",
                    description: "It's slammer time!!",
                    competition_owner_id: 4,
                    profile_pic_url: "Pog_Collection_badna5"}.merge(generate_colors("Pog_Collection_badna5")))

Competition.create!({name: "Starring Stars", location: "Los Angeles, CA",
                     description: "We set up starring contests with celebrities!",
                     competition_owner_id: 2,
                     profile_pic_url: "taylor-karlie-vogue-video_gpx6uo"}.merge(generate_colors("taylor-karlie-vogue-video_gpx6uo")))

Interest.create!(name: "Sports")
Interest.create!(name: "Coding")
Interest.create!(name: "Cats")
Interest.create!(name: "Dogs")
Interest.create!(name: "Working out")
Interest.create!(name: "Playing cards")
Interest.create!(name: "Vegetables")

Competition.all.each do |competition|
  num_interests = rand(2) + 1;
  interest_ids = []
  num_interests.times do |i|
    interest_ids.push(rand(i+1) + 2)
  end
  competition.interest_ids = interest_ids.uniq
end

User.first.competition_ids = [1, 2, 4]
User.first.interest_ids = [1, 2, 3]
User.last.competition_ids = [5, 8, 9]
User.first.interest_ids = [5, 1, 6]

Event.create!({name: "Hiking", description: "Let's go hiking!", competition_id: 1})
