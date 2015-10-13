# Phase 1: User Authentication, DB/Model setup, and JSON API

## Rails
### Models
* User
* Competition
* Event
* UserCompetition
* UserEvent
* Interest
* UserInterest
* CompetitionInterests
* CompetitionPhotos

### Controllers
* StaticPagesController (index)
* UsersController (create, index, new, show, update)
* SessionsController (create, destroy, new)
* Api::CompetitionController (create, index, show, update)
* Api::EventsController (index, show)
* Api::InterestsController (index)

### Views
* static_pages/index.html.erb
* users/new.html.erb
* users/create.json.jbuilder
* users/index.json.jbuilder
* users/show.json.jbuilder
* users/update.json.jbuilder
* session/new.html.erb
* competitions/create.json.jbuilder
* competitions/index.json.jbuilder
* competitions/show.json.jbuilder
* competitions/update.json.jbuilder
* events/index.json.jbuilder
* events/show.json.jbuilder
* interests/index.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt
