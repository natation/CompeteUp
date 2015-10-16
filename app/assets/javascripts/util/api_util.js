(function(root) {
  'use strict';
  root.ApiUtil = {
    fetchCompetitionMatches: function (queryParams) {
      $.ajax({
        url: "/api/competitions/",
        type: "GET",
        dataType: "json",
        data: {query: queryParams},
        success: function (competitions) {
          ApiActions.receiveAllCompetitions(competitions);
        }
      });
    },
    fetchAllInterests: function (queryParams) {
      $.ajax({
        url: "/api/interests/",
        type: "GET",
        dataType: "json",
        data: {query: queryParams},
        success: function (interests) {
          ApiActions.receiveAllInterests(interests);
        }
      });
    },
    fetchCurrentUser: function () {
      $.ajax({
        url: "/users/" + window.CURRENT_USER_ID,
        type: "GET",
        dataType: "json",
        success: function (user) {
          ApiActions.receiveSingleUser(user);
        }
      });
    },
    updateCurrentUser: function (user) {
      $.ajax({
        url: "/users/" + window.CURRENT_USER_ID,
        type: "PATCH",
        dataType: "json",
        data: {user: user},
        success: function (message) {
          ApiActions.sendMessage(message, false);
        },
        error: function (error) {
          ApiActions.sendError(error, true);
        }
      });
    },
    removeInterest: function (name) {
      $.ajax({
        url: "api/interests/" + window.CURRENT_USER_ID,
        type: "DELETE",
        dataType: "json",
        data: {name: name},
        success: function (message) {
          ApiActions.sendMessage(message, true);
        },
        error: function (error) {
          ApiActions.sendError(error, true);
        }
      });
    },
    logOut: function () {
      $.ajax({
        url: "/session/",
        type: "DELETE",
        success: function () {
          window.location = "/";
        }
      });
    }
  };
}(this));
