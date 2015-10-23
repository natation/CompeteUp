(function(root) {
  'use strict';
  var _messages = {};
  var _delayedMessage = {};
  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetMessages = function (messages) {
    _messages = messages;
  };

  var resetDelayedMessage = function (delayedMessage) {
    _delayedMessage = delayedMessage;
  };

  root.MessageStore = $.extend({}, EventEmitter.prototype, {
    getMessages: function () {
      return $.extend({}, _messages);
    },
    getDelayedMessages: function () {
      var unReadMessage = _delayedMessage;
      _delayedMessage = {};
      return unReadMessage;
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
          resetDelayedMessage(payload.message);
          MessageStore.emit(CHANGE_EVENT);
          break;
        case MessageConstants.ERROR_RECEIVED:
          resetMessages(payload.error);
          resetDelayedMessage(payload.error);
          MessageStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
