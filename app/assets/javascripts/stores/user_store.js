(function(root) {
  'use strict';
  var _users = [];
  var CURRENT_USER_RECEIVED = "CURRENT_USER_RECEIVED";

  var resetUsers = function (users) {
    _users = users;
  };

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _users.slice();
    },
    getCurrentUser: function () {
      return _.first(_users);
    },
    addCurrentUserReceivedListener: function (callback) {
      UserStore.on(CURRENT_USER_RECEIVED, callback);
    },
    removeCurrentUserReceivedListener: function (callback) {
      UserStore.removeListener(CURRENT_USER_RECEIVED, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case UserConstants.CURRENT_USER_RECEIVED:
          resetUsers(payload.user);
          UserStore.emit(CURRENT_USER_RECEIVED);
          break;
      }
    })
  });
}(this));
