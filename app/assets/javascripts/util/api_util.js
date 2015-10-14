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
    fetchAllInterests: function () {
      $.ajax({
        url: "/api/interests/",
        type: "GET",
        dataType: "json",
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
