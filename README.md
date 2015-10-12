# CompeteUp

[Visit CompeteUp!](http://competeup.herokuapp.com)

## Minimum Viable Product

CompeteUp is a [Meetup](http://www.meetup.com/) inspired web application that
I created using a Ruby on Rails backend and a frontend implemented with
React.js, JSX, and jQuery. CompeteUp allows people to:

- [ ] Sign up for an account
- [ ] Log in / Log out
- [ ] Search for different competitions to help improve different skills
- [ ] Sort competitions by parameters (distance, number of members, newest)
- [ ] Be able to see a calendar view of competitions
- [ ] Have a profile page upon account creation
- [ ] See other members' profile pages and be able to message them
- [ ] See a competition's home page and be able to join the competition

## Design Docs
* [Components and Wireframes](./docs/wireframes.md)
* [DB schema](./docs/schema.md)

## Implementation Timeline

### Phase 1: User Authentication, DB/Model setup, and JSON API (2 days)

I will begin by creating a static splash page with a navigation bar that
contains 'Sign Up' and 'Sign in' links, each linking to its own static page.
Upon login, the static root page contains the application's root React
component (Index). I will create all the databases and seed them with some test
data. Then I will be implementing user signup and authentication (using BCrypt).
Before building out the front end, I will begin by setting up a full JSON API.
The API will support CRUD operations as needed.

[Details](./docs/phases/phase1.md)

### Phase 2: Flux Architecture, Index Search, and User Profile (2.5 days)

I will setting up a Flux architecture, the React Router, and the React view
structure for the main application based on the component hierarchy. This
includes the dispatcher, actions, and basic store structures (User, Competition,
Photo, Discussion, Message). Then I will work on the Index Search bar. It will
be able to search on-the-fly, to sort, and filter competitions similar to the
Meetup index search bar. In addition, it should be able to show the calendar of
events. Once this is done, I will create a React view for the UserProfile page.
Users will be able to view and edit their profiles, as well as message other
users. Lastly, while constructing the views I will start using basic bootstrap
for styling.

[Details](./docs/phases/phase2.md)

### Phase 3: Competition Profiles (2 days)

Now I will build out the frontend for CompetitionProfile, and I will start with
the Competition Profile navigation bar. Then I will move on to the side panel
and the main section. The main section will change to whatever is selected on
the navigation bar. Once this is all complete, a user will be able to see
the competition's information, description, upcoming events, members, photos,
and the discussion board. Also, on the Index page, a random, but pertinent,
competition image will appear on filtered/sorted competitions listings.

[Details](./docs/phases/phase3.md)

### Phase 4: Finish up unfinished features and continue styling (1.5 days)

In this phase I will test and tweak features, as well as finish up any ones that
are not complete. Moreover, I will continue styling to make the site look great.

### Phase 5: Styling Cleanup and Seeding (1 day)

Even though Bootstrap is being used throughout building the project, I will
still need to clean up the styling. In addition, I will seed engaging data so
it will be able to pique people's interest. Create a README.rdoc.

### Bonus Features (TBD)
- [ ] Infinite scroll for Index
- [ ] Search for members on competition profile page
- [ ] Ability to delete your own discussions and upload photos
- [ ] Creation and modification of competitions
