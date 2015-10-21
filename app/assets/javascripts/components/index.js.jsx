(function(root) {
  'use strict';
  root.Index = React.createClass({
    render: function () {
      return (
        <div className="container-fluid">
          <RB.Row>
            <RB.Jumbotron className="jumbotron-main">
              <h3>Welcome, {window.CURRENT_USER_INFO.name}!</h3>
            </RB.Jumbotron>
          </RB.Row>
          <RB.Grid className="search-bar">
            <SearchBar/>
          </RB.Grid>
          <Competition/>
        </div>
      );
    }
  });
}(this));
