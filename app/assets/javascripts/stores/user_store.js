(function(root) {
  'use strict';
  var _users = [],
      _organizer = {},
      _currentUser = {};

  var CHANGE_EVENT = "CHANGE_EVENT",
      ORGANIZER_CHANGE_EVENT = "ORGANIZER_CHANGE_EVENT",
      CURRENT_USER_CHANGE_EVENT = "CURRENT_USER_CHANGE_EVENT";

  var resetUsers = function (users) {
    _users = users;
  };

  var resetOrganizer = function (user) {
    _organizer = user;
  };

  var resetCurrentUser = function (user) {
    _currentUser = user;
  };

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _users.slice();
    },
    getUser: function () {
      return _.first(_users);
    },
    getCurrentUser: function () {
      return $.extend({}, _currentUser);
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
    addCurrentUserListener: function (callback) {
      UserStore.on(CURRENT_USER_CHANGE_EVENT, callback);
    },
    removeCurrentUserListener: function (callback) {
      UserStore.removeListener(CURRENT_USER_CHANGE_EVENT, callback);
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
        case UserConstants.CURRENT_USER_RECEIVED:
          resetCurrentUser(payload.user);
          UserStore.emit(CURRENT_USER_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
