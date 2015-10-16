(function(root) {
  'use strict';
  root.ApiActions = {
    receiveAllCompetitions: function (competitions) {
      AppDispatcher.dispatch({
        actionType: CompetitionConstants.COMPETITIONS_RECEIVED,
        competitions: competitions
      });
    },
    receiveAllInterests: function (interests) {
      AppDispatcher.dispatch({
        actionType: InterestConstants.INTERESTS_RECEIVED,
        interests: interests
      });
    },
    receiveSingleUser: function (user) {
      AppDispatcher.dispatch({
        actionType: UserConstants.CURRENT_USER_RECEIVED,
        user: [user]
      });
    },
    sendMessage: function (message, flashNow) {
      AppDispatcher.dispatch({
        actionType: MessageConstants.MESSAGE_RECEIVED,
        message: message,
        flashNow: flashNow
      });
    },
    sendError: function (error, flashNow) {
      AppDispatcher.dispatch({
        actionType: MessageConstants.ERROR_RECEIVED,
        error: error,
        flashNow: flashNow
      });
    }
  };
}(this));
