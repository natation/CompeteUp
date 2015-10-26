(function(root) {
  'use strict';
  root.ApiActions = {
    receiveAllCompetitions: function (competitions) {
      AppDispatcher.dispatch({
        actionType: CompetitionConstants.COMPETITIONS_RECEIVED,
        competitions: competitions
      });
    },
    receiveAllSuggestions: function (competitions) {
      AppDispatcher.dispatch({
        actionType: CompetitionConstants.SUGGESTIONS_RECEIVED,
        competitions: competitions
      });
    },
    receiveAllInterestCompetitions: function (competitions) {
      AppDispatcher.dispatch({
        actionType: CompetitionConstants.INTEREST_COMPETITIONS_RECEIVED,
        competitions: competitions
      });
    },
    receiveAllInterests: function (interests) {
      AppDispatcher.dispatch({
        actionType: InterestConstants.INTERESTS_RECEIVED,
        interests: interests
      });
    },
    receiveAllEvents: function (events) {
      AppDispatcher.dispatch({
        actionType: EventConstants.EVENTS_RECEIVED,
        events: events
      });
    },
    receiveCurrentUser: function (user) {
      AppDispatcher.dispatch({
        actionType: UserConstants.CURRENT_USER_RECEIVED,
        user: user
      });
    },
    receiveSingleUser: function (user) {
      AppDispatcher.dispatch({
        actionType: UserConstants.USERS_RECEIVED,
        users: [user]
      });
    },
    receiveOrganizer: function (user) {
      AppDispatcher.dispatch({
        actionType: UserConstants.ORGANIZER_RECEIVED,
        user: user
      });
    },
    receiveAllUsers: function (users) {
      AppDispatcher.dispatch({
        actionType: UserConstants.USERS_RECEIVED,
        users: users
      });
    },
    sendSuccess: function (message) {
      AppDispatcher.dispatch({
        actionType: MessageConstants.MESSAGE_RECEIVED,
        message: message
      });
    },
    sendError: function (error) {
      AppDispatcher.dispatch({
        actionType: MessageConstants.ERROR_RECEIVED,
        error: error
      });
    }
  };
}(this));
