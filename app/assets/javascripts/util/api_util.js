(function(root) {
  'use strict';
  root.ApiUtil = {
    fetchAllCompetitions: function () {
      $.ajax({
        url: "/api/competitions/",
        type: "GET",
        dataType: "json",
        success: function (competitions) {
          ApiActions.receiveAllCompetitions(competitions);
        }
      });
    },
    fetchCompetitionMatches: function (queryStr) {
      $.ajax({
        url: "/api/competitions/",
        type: "GET",
        dataType: "json",
        data: {query: queryStr},
        success: function (competitions) {
          ApiActions.receiveAllCompetitions(competitions);
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
