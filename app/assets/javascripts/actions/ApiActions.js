(function(root) {
  'use strict';
  root.ApiActions = {
    receiveAllCompetitions: function (competitions) {
      AppDispatcher.dispatch({
        actionType: CompetitionConstants.COMPETITIONS_RECEIVED,
        competitions: competitions
      });
    }
  };
}(this));