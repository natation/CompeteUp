(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
      return {searchText: ""};
    },
    handleClick: function () {
      this.props.handleSearchClick(this.state.searchText);
    },
    render: function () {
      return (
      	<div className="row">
          <div className="col-md-6">
            <div className="input-group col-md-12">
              <input type="text" className="form-control input-lg"
                     valueLink={this.linkState("searchText")}
                     placeholder="All Competitions"/>
              <div className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button"
                        onClick={this.handleClick}>
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
