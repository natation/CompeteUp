(function(root) {
  'use strict';
  var _events = [];
  var CHANGED_EVENT = "CHANGED_EVENT";

  var resetEvents = function (events) {
    _events = events;
  };

  root.EventStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _events.slice();
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
