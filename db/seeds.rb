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

vic = {name: "Vic", email: "vic@vic.com", location: "San Francisco, CA",
              bio: "I'm a software developer and I really enjoy programming!",
              password: "1234567"}.merge(generate_colors("vic_yxtabw"))
olaf = {name: "Olaf", email: "olaf@frozen.com", location:"San Francisco, CA",
              bio: "I love the cold. Snowboarding is so fun! Not a fan of the beach. It's too hot to handle!",
              password: "123456", profile_pic_url: "cam47h3p9f8xhdgshflo"}.merge(generate_colors("cam47h3p9f8xhdgshflo"))
joy =  {name: "Joy", email: "joy@insideout.com", location:"Stanford, CA",
              bio: "I'm so happy!! I want to create many happy memories for you!",
              password: "123456", profile_pic_url: "joy_orwfen"}.merge(generate_colors("joy_orwfen"))

User.create!(vic)
User.create!(olaf)
User.create!(joy)

Interest.create!(name: "Sports")
Interest.create!(name: "Coding")
Interest.create!(name: "Cats")
Interest.create!(name: "Dogs")
Interest.create!(name: "Working out") #5
Interest.create!(name: "Cards")
Interest.create!(name: "Fruits")
Interest.create!(name: "Movies")
Interest.create!(name: "Computers")
Interest.create!(name: "Comics") #10
Interest.create!(name: "Math")
Interest.create!(name: "Gadgets")
Interest.create!(name: "Snow")
Interest.create!(name: "Sun")
Interest.create!(name: "Books") #15
Interest.create!(name: "Games")
Interest.create!(name: "Tech")

locations = ApplicationController::LOCATIONS
Competition.create!({name: "Basketball", location: locations[rand(locations.length)],
                     description: "Come join us for 5 on 5 every day!",
                     competition_owner_id: 1,
                     profile_pic_url: "basketball_ch5fpf"}.merge(generate_colors("basketball_ch5fpf")))
Competition.find(1).interest_ids = [1, 5, 14]
Event.create!({name: "Basketball tomorrow", description: "We will be playing 5 on 5 at Dolores Park!", competition_id: 1})
Competition.create!({name: "Football", location: locations[rand(locations.length)],
                     description: "We play flag football every Saturday!",
                     competition_owner_id: 1,
                     profile_pic_url: "fb_stadium_evenue_2013_isbzdp"}.merge(generate_colors("fb_stadium_evenue_2013_isbzdp")))
Event.create!({name: "Bring your own flags!", description: "Let's show up tomorrow at Crissy Field at 4PM!", competition_id: 2})
Competition.find(2).interest_ids = [1, 5, 14]
Competition.create!({name: "Soccer", location: locations[rand(locations.length)],
                     description: "This is the real football!",
                     competition_owner_id: 1,
                     profile_pic_url: "soccer_wus2te"}.merge(generate_colors("soccer_wus2te")))
Competition.find(3).interest_ids = [1, 5, 14]
Event.create!({name: "SF City Football Club", description: "Our opening match between El Farolito v. Mezcala was very exciting.", competition_id: 3})
Competition.create!({name: "Whitewater Adventures", location: locations[rand(locations.length)],
                     description: "We are awesome, fun, and love water!",
                     competition_owner_id: 1,
                     profile_pic_url: "rafting_t1cwim"}.merge(generate_colors("rafting_t1cwim")))
Competition.find(4).interest_ids = [1, 5, 14]
Event.create!({name: "Come Raft with Us", description: "Bring your friends, family, company, or club for a whitewater adventure through the wilderness. Enjoy the wildlife during the day and gourmet campfire cuisine served in a tiki torch setting overlooking the river at night. Evenings at our riverside camps are enchanting and starlit with nothing but the whisper of the water to lull you to sleep.", competition_id: 4})
Competition.create!({name: "Gardening", location: "Los Angeles, CA",
                     description: "You can put a pitchfork in the competition, literally!",
                     competition_owner_id: 1,
                     profile_pic_url: "gardening-van-houtte-coffee_emag_article_large_eqpuxq"}.merge(generate_colors("gardening-van-houtte-coffee_emag_article_large_eqpuxq")))
Competition.find(5).interest_ids = [14]
Event.create!({name: "National Gardening Awareness", description: "In honor of National Gardening Awareness month, we will be selling gardening supplies for half off", competition_id: 5})
Competition.create!({name: "Slick Snowboarders", location: locations[rand(locations.length)],
                     description: "Which one of us can do the best trick? Join to find out!",
                     competition_owner_id: 2,
                     profile_pic_url: "snowboarding_e54ole"}.merge(generate_colors("snowboarding_e54ole")))
Competition.find(6).interest_ids = [1, 13, 14]
Event.create!({name: "Tahoe Trip", description: "We are planning to go to Lake Tahoe at first snow so we can be the first to experience the wonderful powder!", competition_id: 6})
Competition.create!({name: "Magic Cards", location: locations[rand(locations.length)],
                     description: "Magic Cards and card games every day!",
                     competition_owner_id: 2,
                     profile_pic_url: "magic_dcgbp7"}.merge(generate_colors("magic_dcgbp7")))
Competition.find(7).interest_ids = [6, 9, 10, 11, 16]
Event.create!({name: "World Magic Cup Event", description: "Over 70 countries will be represented in Barcelona, Spain for three days of team competition at the 2015 World Magic Cup. With a $250,000 prize purse and invitations to the first Pro Tour of 2016 up for grabs, each country will be represented by four players per team as they play for big prizes and the glory of representing their country on one of Magic's biggest stages.", competition_id: 7})
Competition.create!({name: "Thumb Wars", location: locations[rand(locations.length)],
                     description: "Our thumbs are ripped up!",
                     competition_owner_id: 2,
                     profile_pic_url: "670px-Dominate-at-Thumb-Wars-Step-4-Version-2_w1roud"}.merge(generate_colors("670px-Dominate-at-Thumb-Wars-Step-4-Version-2_w1roud")))
Competition.find(8).interest_ids = [16]
Event.create!({name: "2015 Thumbwars Competition", description: "The World Thumb Wrestling Championship is being held at a NEW VENUE this year", competition_id: 8})
Competition.create!({name: "Photography", location: locations[rand(locations.length)],
                     description: "Let's see who can take the best photos!",
                     competition_owner_id: 2,
                     profile_pic_url: "photography_vvbgcq"}.merge(generate_colors("photography_vvbgcq")))
Competition.find(9).interest_ids = [3, 4, 7, 12, 17]
Competition.create!({name: "Scuba Diving", location: locations[rand(locations.length)],
                     description: "Descend into the depths of the ocean with us..",
                     competition_owner_id: 2,
                     profile_pic_url: "scuba_rgj79n"}.merge(generate_colors("scuba_rgj79n")))
Competition.find(10).interest_ids = [1, 9, 14, 17]
Competition.create!({name: "Fruit Fanatics", location: locations[rand(locations.length)],
                     description: "We see who can prepare, plate, and eat delicious fruit!",
                     competition_owner_id: 3,
                     profile_pic_url: "fruit_eating_usyotk"}.merge(generate_colors("fruit_eating_usyotk")))
Competition.find(11).interest_ids = [7, 14]
Competition.create!({name: "Autumn Searchers", location: locations[rand(locations.length)],
                     description: "Looking to see who can find the best autumn scene!",
                     competition_owner_id: 3,
                     profile_pic_url: "fall_x4y7hs"}.merge(generate_colors("fall_x4y7hs")))
Competition.find(12).interest_ids = [3, 4, 14, 17]
Competition.create!({name: "Coding Cadets", location: locations[rand(locations.length)],
                     description: "Coding every day! We look for the best coding talent.",
                     competition_owner_id: 3,
                     profile_pic_url: "coding_aaccc2"}.merge(generate_colors("coding_aaccc2")))
Competition.find(13).interest_ids = [6, 9, 10, 11, 12, 15, 16, 17]
Competition.create!({name: "Super Skateboarders", location: locations[rand(locations.length)],
                     description: "Try and top us at getting the biggest air!",
                     competition_owner_id: 3,
                     profile_pic_url: "skateboarding_ker0lm"}.merge(generate_colors("skateboarding_ker0lm")))
Competition.find(14).interest_ids = [1, 14, 16]
Competition.create!({name: "Mare Mayhem", location: locations[rand(locations.length)],
                     description: "To tame or not to tame, that is the question!",
                     competition_owner_id: 3,
                     profile_pic_url: "horse_vduvz6"}.merge(generate_colors("horse_vduvz6")))
Competition.find(15).interest_ids = [3, 4, 8, 14]

User.first.competition_ids = [1, 2, 3, 4, 5, 8, 10, 15]
User.find(2).competition_ids = [6, 7, 8, 9, 10, 13, 14]
User.find(3).competition_ids = [1, 3, 5, 7, 11, 12, 13, 14, 15]

User.first.interest_ids = [1, 2, 3, 4, 5, 10, 12, 14, 15, 17]
User.find(2).interest_ids = [5, 7, 12, 13]
User.find(3).interest_ids = [2, 3, 4, 10, 14, 15]
