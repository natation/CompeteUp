(function(root) {
  'use strict';
  var _events = [],
      _competitionIsJoined = false;

  var CHANGED_EVENT = "CHANGED_EVENT";

  var resetEvents = function (events) {
    _events = events.events;
    _competitionIsJoined = events.competitionIsJoined;
  };

  root.EventStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _events.slice();
    },
    competitionIsJoined: function () {
      return !!_competitionIsJoined;
    },
    addChangeListener: function (callback) {
      EventStore.on(CHANGED_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      EventStore.removeListener(CHANGED_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case EventConstants.EVENTS_RECEIVED:
          resetEvents(payload.events);
          EventStore.emit(CHANGED_EVENT);
          break;
      }
    })
  });
}(this));
