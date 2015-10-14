(function(root) {
  'use strict';
  root.SearchBar = React.createClass({

    handleInputClick: function (e) {
      
    },
    render: function () {
      return (
      	<div className="row">
          <div className="col-md-6">
            <div className="input-group col-md-12">
              <input type="text" className="form-control input-lg" onClick={this.handleInputClick} placeholder="All Competitions"/>
              <div className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button">
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
