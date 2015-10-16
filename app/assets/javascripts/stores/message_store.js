(function(root) {
  'use strict';
  var _messages = {};
  var _notifications = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetMessages = function (messages) {
    _messages = messages;
  };

  var addNotification = function (notification) {
    _notifications.push(notification);
  };

  root.MessageStore = $.extend({}, EventEmitter.prototype, {
    getMessage: function () {
      return $.extend({}, _messages);
    },
    getNotifications: function () {
      var unReadNotifications = _notifications;
      _notifications = [];
      return unReadNotifications;
    },
    addChangeListener: function (callback) {
      MessageStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      MessageStore.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case MessageConstants.MESSAGE_RECEIVED:
          resetMessages(payload.message);
          if (!payload.flashNow) {
            addNotification(payload.message.responseJSON);
          }
          MessageStore.emit(CHANGE_EVENT);
          break;
        case MessageConstants.ERROR_RECEIVED:
          resetMessages(payload.error);
          if (!payload.flashNow) {
            addNotification(payload.error.responseJSON);
          }
          MessageStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
