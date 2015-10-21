(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    getInitialState: function () {
      return {searchText: ""};
    },
    handleKeyPress: function (e) {
      var searchQuery = e.target.value ? {searchText: e.target.value} : null;
      ApiUtil.fetchCompetitionMatches(searchQuery);
    },
    handleBarClick: function () {
      ApiUtil.fetchAllInterests();
    },
    render: function () {
      return (
      	<div className="row">
          <div className="col-md-6">
              <input type="text" className="form-control input-lg"
                     onChange={this.handleKeyPress}
                     placeholder="All Competitions"/>
          </div>
      	</div>
      );
    }
  });
}(this));
