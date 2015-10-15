locations = ["San Francisco, CA", "Berkeley, CA", "Los Angeles, CA", "Eureka, CA"]
User.create!({name: "Vic", email: "vic@vic.com", location:"San Francisco, CA",
              bio: "I'm working", password: "123456"})
5.times do |i|
  User.create!({name: "user #{i}", email: "user#{i}@example.com",
                bio: "I'm working on #{i}", password: "123456+#{i}",
                location: locations[rand(4)]})
end

# Competition.create!({name: "Basketball", location: "San Francisco",
#                      description: "Ball it up!", competition_owner_id: 2})

# Competition.create!({name: "Football", location: "San Francisco",
#                      description: "49ers are cool!", competition_owner_id: 2})
#
# Competition.create!({name: "Soccer", location: "San Francisco",
#                     description: "Earthquakes are cool!", competition_owner_id: 3})
# Competition.create!({name: "AppAcademy", location: "San Francisco",
#                      description: "Coding all the time!", competition_owner_id: 4})
#
# Interest.create!(name: "Sports")
# Interest.create!(name: "Coding")
# Interest.create!(name: "Cats")
# Interest.create!(name: "Dogs")
#
# User.first.competition_ids = [1, 2, 4]
# User.first.interest_ids = [1, 2, 3]
