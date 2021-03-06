# CompeteUp

[Live](http://www.competeup.xyz)

## Minimum Viable Product

CompeteUp is a [Meetup](http://www.meetup.com/) inspired web application that
I created using a Ruby on Rails API backend and a front-end implemented with
React.js, JSX, and jQuery. CompeteUp allows people to:

- [x] Sign up for an account
- [x] Log in / Log out
- [x] Search for different competitions to help improve different skills
- [x] Have a profile page upon account creation
- [x] Create competitions
- [x] See other members' profile pages
- [x] See a competition's home page and be able to join the competition

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

### Phase 2: Flux Architecture and Index Search (1.5 days)

I will setting up a Flux architecture, the React Router, and the React view
structure for the main application based on the component hierarchy. This
includes the dispatcher, actions, and basic store structures (User, Competition,
Photo). Then I will work on the Index Search bar. It will be able to search
on-the-fly similar to the Meetup index search bar.

[Details](./docs/phases/phase2.md)

### Phase 3: User Profile (1 day)

I will create a React view for the UserProfile page. Users will be able to view
and edit their profiles. While constructing the views I will start using basic
bootstrap for styling.

[Details](./docs/phases/phase3.md)

### Phase 4: Competition Profiles (2 days)

Now I will build out the frontend for CompetitionProfile, and I will start with
the Competition Profile navigation bar. Then I will move on to the side panel
and the main section. The main section will change to whatever is selected on
the navigation bar. Once this is all complete, a user will be able to see
the competition's information, description, upcoming events, members, and
photos. Also, on the Index page, a random, but pertinent, competition image will
appear. Users can join and create competitions.

[Details](./docs/phases/phase4.md)

### Phase 5: Finish up unfinished features and continue styling (1.5 days)

In this phase I will test and tweak features, as well as finish up any ones that
are not complete. Moreover, I will continue styling to make the site look good.

### Phase 6: Styling Cleanup and Seeding (1 day)

Even though Bootstrap is being used throughout building the project, I will
still need to clean up the styling. In addition, I will seed engaging data so
it will be able to pique people's interest. Create a README.rdoc.

### Bonus Features (TBD)
- [ ] Infinite scroll for Index
- [ ] Search for members on competition profile page
- [ ] Ability to delete your own discussions and upload photos
- [ ] Creation and modification of competitions
- [ ] Discussion board for Competition profile page
- [ ] Users can message each other
- [ ] Add more filtering/sorting ability
- [ ] Calendar view for events on Index page
