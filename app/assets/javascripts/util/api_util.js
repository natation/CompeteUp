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
    fetchCompetitionSuggestions: function (queryParams) {
      $.ajax({
        url: "/api/competitions/",
        type: "GET",
        dataType: "json",
        data: {query: queryParams},
        success: function (competitions) {
          ApiActions.receiveAllSuggestions(competitions);
        }
      });
    },
    fetchInterestCompetitions: function (queryParams) {
      $.ajax({
        url: "/api/competitions/",
        type: "GET",
        dataType: "json",
        data: {query: queryParams},
        success: function (competitions) {
          ApiActions.receiveAllInterestCompetitions(competitions);
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
    fetchAllEvents: function (queryParams) {
      $.ajax({
        url: "api/events",
        type: "GET",
        dataType: "json",
        data: {query: queryParams},
        success: function (events) {
          ApiActions.receiveAllEvents(events);
        }
      });
    },
    fetchCurrentUser: function () {
      $.ajax({
        url: "/users/1",
        type: "GET",
        dataType: "json",
        success: function (user) {
          ApiActions.receiveCurrentUser(user);
        }
      });
    },
    fetchSingleUser: function () {
      $.ajax({
        url: "/users/1",
        type: "GET",
        dataType: "json",
        success: function (user) {
          ApiActions.receiveSingleUser(user);
        }
      });
    },
    fetchOrganizer: function (userParams) {
      $.ajax({
        url: "/users/1",
        type: "GET",
        dataType: "json",
        data: {user: userParams},
        success: function (user) {
          ApiActions.receiveOrganizer(user);
        }
      });
    },
    fetchAllUsers: function (queryParams) {
      $.ajax({
        url: "/users",
        type: "GET",
        dataType: "json",
        data: {user: queryParams},
        success: function (users) {
          ApiActions.receiveAllUsers(users);
        }
      });
    },
    updateCurrentUser: function (user) {
      $.ajax({
        url: "/users/1",
        type: "PATCH",
        dataType: "json",
        data: {user: user},
        success: function (message) {
          ApiActions.sendSuccess(message, false);
        },
        error: function (error) {
          ApiActions.sendError(error, false);
        }
      });
    },
    removeInterest: function (name) {
      $.ajax({
        url: "/api/interests/1",
        type: "DELETE",
        dataType: "json",
        data: {name: name},
        success: function (message) {
          ApiActions.sendSuccess(message, false);
        },
        error: function (error) {
          ApiActions.sendError(error, false);
        }
      });
    },
    createCompetition: function (competition) {
      $.ajax({
        url: "/api/competitions/",
        type: "POST",
        dataType: "json",
        data: {competition: competition},
        success: function (message) {
          ApiActions.sendSuccess(message);
        },
        error: function (error) {
          ApiActions.sendError(error);
        }
      });
    },
    joinCompetition: function (competition) {
      $.ajax({
        url: "/api/competitions/",
        type: "POST",
        dataType: "json",
        data: {joinCompetition: competition},
        success: function (message) {
          ApiActions.sendSuccess(message);
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
