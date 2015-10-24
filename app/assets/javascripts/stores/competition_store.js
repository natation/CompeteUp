(function(root) {
  'use strict';
  var _competitions = [],
      _suggestions = [],
      _interestCompetitions = [];

  var CHANGED_EVENT = "CHANGED_EVENT",
      SUGGESTIONS_CHANGED = "SUGGESTIONS_CHANGED",
      INTEREST_COMPETITIONS_CHANGED = "INTEREST_COMPETITIONS_CHANGED";

  var resetCompetitions = function (competitions) {
    _competitions = competitions;
  };

  var resetSuggestions = function (competitions) {
    _suggestions = competitions;
  };

  var resetInterestCompetitions = function (competitions) {
    _interestCompetitions = competitions;
  };

  root.CompetitionStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _competitions.slice();
    },
    getCurrentCompetition: function () {
      return _.first(_competitions);
    },
    allSuggestions: function () {
      return _suggestions.slice();
    },
    allInterestCompetitions: function () {
      return _interestCompetitions.slice();
    },
    addChangeListener: function (callback) {
      CompetitionStore.on(CHANGED_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      CompetitionStore.removeListener(CHANGED_EVENT, callback);
    },
    addSuggestionsListener: function (callback) {
      CompetitionStore.on(SUGGESTIONS_CHANGED, callback);
    },
    removeSuggestionsListener: function (callback) {
      CompetitionStore.removeListener(SUGGESTIONS_CHANGED, callback);
    },
    addInterestCompetitionListener: function (callback) {
      CompetitionStore.on(INTEREST_COMPETITIONS_CHANGED, callback);
    },
    removeInterestCompetitionListener: function (callback) {
      CompetitionStore.removeListener(INTEREST_COMPETITIONS_CHANGED, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case CompetitionConstants.COMPETITIONS_RECEIVED:
          resetCompetitions(payload.competitions);
          CompetitionStore.emit(CHANGED_EVENT);
          break;
        case CompetitionConstants.SUGGESTIONS_RECEIVED:
          resetSuggestions(payload.competitions);
          CompetitionStore.emit(SUGGESTIONS_CHANGED);
          break;
        case CompetitionConstants.INTEREST_COMPETITIONS_RECEIVED:
          resetInterestCompetitions(payload.competitions);
          CompetitionStore.emit(INTEREST_COMPETITIONS_CHANGED);
          break;
      }
    })
  });
}(this));
