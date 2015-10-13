User.create!({name: "Vic", email: "vic@vic.com",
              bio: "I'm working", password: 123456})
5.times do |i|
  User.create!({name: "user #{i}", email: "user#{i}@example.com",
                bio: "I'm working on #{i}", password: 123456+i})
end

Competition.create!({name: "Basketball", location: "San Francisco",
                     description: "Ball it up!", competition_owner_id: 2})

Competition.create!({name: "Football", location: "San Francisco",
                     description: "49ers are cool!", competition_owner_id: 2})

Competition.create!({name: "Soccer", location: "San Francisco",
                    description: "Earthquakes are cool!", competition_owner_id: 3})
Competition.create!({name: "AppAcademy", location: "San Francisco",
                     description: "Coding all the time!", competition_owner_id: 4})

Interest.create!(name: "Sports")
Interest.create!(name: "Coding")
