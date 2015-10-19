(function(root) {
  'use strict';
  var _competitions = [];
  var CHANGED_EVENT = "CHANGED_EVENT";

  var resetCompetitions = function (competitions) {
    _competitions = competitions;
  };

  root.CompetitionStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _competitions.slice();
    },
    getCurrentCompetition: function () {
      return _.first(_competitions);
    },
    addChangeListener: function (callback) {
      CompetitionStore.on(CHANGED_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      CompetitionStore.removeListener(CHANGED_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case CompetitionConstants.COMPETITIONS_RECEIVED:
          resetCompetitions(payload.competitions);
          CompetitionStore.emit(CHANGED_EVENT);
          break;
      }
    })
  });
}(this));
