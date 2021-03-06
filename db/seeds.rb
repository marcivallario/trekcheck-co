# reset database: rails db:reset db:seed

puts "Seeding..."

# Users

user1 = User.create!(email: 'marcivallario@gmail.com', first_name: 'Marci', last_name: 'Vallario', password: 'Marci123')

# Projects

proj1 = Project.create!(job_no: '300-31', job_name: 'Messiah', prod_co: 'Old Story Productions', active: true, user_id: user1.id)

proj2 = Project.create!(job_no: '300-28', job_name: 'The Story of God', prod_co: 'Evolve Studios', active: false, user_id: user1.id)

proj3 = Project.create!(job_no: '300-43', job_name: 'Euphoria', prod_co: 'A24', active: true, user_id: user1.id)

proj4 = Project.create!(job_no: '300-47', job_name: 'Handmaid\'s Tale', prod_co: 'MGM Television', active: true, user_id: user1.id)

proj5 = Project.create!(job_no: '300-53', job_name: 'Tom Clancy\'s Jack Ryan', prod_co: 'Paramount Television Studios', active: true, user_id: user1.id)

# Passengers

pass1 = Passenger.create!(user_id: user1.id, legal_first_name: "John", legal_last_name: "Brown", nickname: "JJ", position: "BB Electric", department: "G&E", cell: "(407) 475-3333", email: "jbrown68@gmail.com", dob: "1994-01-04", state_of_residence: "CA", passport: "4736549543", license: "VA3445-23445-33", tsa_precheck: "TT484736458", global_entry: "583939903", seat_assignment_pref: "Window")

pass2 = Passenger.create!(user_id: user1.id, legal_first_name: "Jane", legal_last_name: "Doe", position: "Craft Services", department: "Production", cell: "(407) 441-5749", email: "janie.doe@gmail.com", dob: "1993-06-04", state_of_residence: "CA", passport: "4736549543", license: "VA3445-23445-33", tsa_precheck: "TT484736458", global_entry: "583939903", seat_assignment_pref: "Aisle")

pass3 = Passenger.create!(user_id: user1.id, legal_first_name: "Cory", legal_last_name: "Alpha", position: "Production Assistant", department: "Production", cell: "(407) 583-5839", email: "calpha@gmail.com", dob: "1997-05-07", state_of_residence: "CA", passport: "4736549543", license: "VA3445-23445-33", tsa_precheck: "TT484736458", global_entry: "583939903", seat_assignment_pref: "Aisle")

pass4 = Passenger.create!(user_id: user1.id, legal_first_name: "Charles", legal_last_name: "Everett", position: "Executive Producer", department: "Production", cell: "(546) 764-3456", email: "cbeverett@yahoo.com", dob: "1995-05-22", seat_assignment_pref: "Aisle", notes: "Must be booked on Delta for the Skymiles Lounge.")

pass5 = Passenger.create!(user_id: user1.id, legal_first_name: "Benjamin", legal_last_name: "Button", position: "Actor", department: "Talent", cell: "(754) 365-3456", email: "bennybutton5@gmail.com", dob: "1940-12-21", seat_assignment_pref: "Window", notes: "Must be booked into a handicap accessible row and vehicle.")


# Trips

# trip1 = Trip.create!(depart: DateTime.new(2022, 3, 2), return: DateTime.new(2022, 3, 14), itinerary_sent: false, project_id: proj1.id, passenger_id: pass1.id,)

puts "Seeding complete!"
