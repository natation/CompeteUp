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
            <div className="input-group col-md-12">
              <input type="text" className="form-control input-lg"
                     onChange={this.handleKeyPress}
                     placeholder="All Competitions"/>
              <div className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button"
                        onClick={this.handleButtonClick}>
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </div>
            </div>
          </div>
      	</div>
      );
    }
  });
}(this));
