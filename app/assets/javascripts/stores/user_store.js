(function(root) {
  'use strict';
  var _users = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetUsers = function (users) {
    _users = users;
  };

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _users.slice();
    },
    getUser: function () {
      return _.first(_users);
    },
    addChangeListener: function (callback) {
      UserStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      UserStore.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case UserConstants.CURRENT_USER_RECEIVED:
          resetUsers(payload.user);
          UserStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
