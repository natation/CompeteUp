(function(root) {
  'use strict';
  var _users = [];
  var _organizer = {};

  var CHANGE_EVENT = "CHANGE_EVENT",
      ORGANIZER_CHANGE_EVENT = "ORGANIZER_CHANGE_EVENT";

  var resetUsers = function (users) {
    _users = users;
  };

  var resetOrganizer = function (user) {
    _organizer = user;
  };

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _users.slice();
    },
    getUser: function () {
      return _.first(_users);
    },
    getOrganizer: function () {
      return $.extend({}, _organizer);
    },
    addChangeListener: function (callback) {
      UserStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      UserStore.removeListener(CHANGE_EVENT, callback);
    },
    addOrganizerChangeListener: function (callback) {
      UserStore.on(ORGANIZER_CHANGE_EVENT, callback);
    },
    removeOrganizerChangeListener: function (callback) {
      UserStore.removeListener(ORGANIZER_CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case UserConstants.USERS_RECEIVED:
          resetUsers(payload.users);
          UserStore.emit(CHANGE_EVENT);
          break;
        case UserConstants.ORGANIZER_RECEIVED:
          resetOrganizer(payload.user);
          UserStore.emit(ORGANIZER_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
