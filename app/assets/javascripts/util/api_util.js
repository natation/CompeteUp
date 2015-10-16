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
          ApiActions.sendMessage(message);
        },
        error: function (error) {
          ApiActions.sendError(error);
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
