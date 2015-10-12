# Phase 1: User Authentication, DB/Model setup, and JSON API

## Rails
### Models
* User
* Competition
* Event
* UserCompetition
* UserEvent
* CompetitionEvent
* Interest
* UserInterest
* CompetitionInterests
* CompetitionPhotos
* CompetitionDiscussion
* UserMessage

### Controllers
* UsersController (create, edit, index, new, show, update)
* SessionsController (create, destroy, new)
* Api::CompetitionController (index, show)
* Api::EventsController (index, show)
* Api::InterestsController (index)
* Api::UserInterestsController (index)
* Api::CompetitionInterestsController (index)
* Api::CompetitionPhotosController (index)
* Api::CompetitionDiscussionsController (index)
* Api::UserMessagesController (index)

### Views
* users/new.html.erb
* users/index.json.jbuilder
* users/show.json.jbuilder
* session/new.html.erb
* competitions/index.json.jbuilder
* competitions/show.json.jbuilder
* events/index.json.jbuilder
* events/show.json.jbuilder
* interests/index.json.jbuilder
* competition_interests/index.json.jbuilder
* competition_photos/index.json.jbuilder
* competition_discussions/index.json.jbuilder
* user_messages/index.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt
