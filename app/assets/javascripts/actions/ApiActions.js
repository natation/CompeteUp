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
    }
  };
}(this));
