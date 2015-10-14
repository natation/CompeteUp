(function(root) {
  'use strict';
  var _interests = [];
  var CHANGED_EVENT = "CHANGED_EVENT";

  var resetInterests = function (interests) {
    _interests = interests;
  };

  root.InterestStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _interests.slice();
    },
    addChangeListener: function (callback) {
      InterestStore.on(CHANGED_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      InterestStore.removeListener(CHANGED_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case InterestConstants.INTERESTS_RECEIVED:
          resetInterests(payload.interests);
          InterestStore.emit(CHANGED_EVENT);
          break;
      }
    })
  });
}(this));
