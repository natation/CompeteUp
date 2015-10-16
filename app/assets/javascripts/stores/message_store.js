(function(root) {
  'use strict';
  var _messages = {};
  var _delayedMessages = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetMessages = function (messages) {
    _messages = messages;
  };

  var addDelayedMessage = function (delayedMessage) {
    _delayedMessages.push(delayedMessage);
  };

  root.MessageStore = $.extend({}, EventEmitter.prototype, {
    getMessages: function () {
      return $.extend({}, _messages);
    },
    getDelayedMessages: function () {
      var unReadMessages = _delayedMessages;
      _delayedMessages = [];
      return unReadMessages;
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
            addDelayedMessage(payload.message.responseJSON);
          }
          MessageStore.emit(CHANGE_EVENT);
          break;
        case MessageConstants.ERROR_RECEIVED:
          resetMessages(payload.error);
          if (!payload.flashNow) {
            addDelayedMessage(payload.error.responseJSON);
          }
          MessageStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
