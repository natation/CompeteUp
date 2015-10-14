(function(root) {
  'use strict';
  root.Navbar = React.createClass({
    handleLogout: function () {
      ApiUtil.logOut();
    },
    render: function () {
      return (
        <nav className="navbar">
          <div className="row">
            <div className="col-xs-offset-1 col-xs-1">Logo</div>
            <div className="col-xs-offset-6 col-xs-1">
              Welcome, user # {window.CURRENT_USER_ID}
            </div>
            <div className="col-xs-1">
            <button onClick={this.handleLogout}>Log out</button>
            </div>
          </div>
        </nav>
      );
    }
  });
}(this));
