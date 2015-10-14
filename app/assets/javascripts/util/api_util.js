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
    }
  };
}(this));
