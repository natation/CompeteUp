(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  var IndexLink = ReactRouter.IndexLink;
  root.Navbar = React.createClass({
    handleLogout: function () {
      ApiUtil.logOut();
    },
    render: function () {
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                      aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">LOGO</a>
            </div>
            <div className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a href="#">Find a Competition</a></li>
                <li><Link to="/startCompetition">Start a Competition</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#/profile" className="dropdown-toggle"
                    data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">
                      Welcome, user {window.CURRENT_USER_ID}
                      <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#/profile">Profile</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="javascript:void(0)" onClick={this.handleLogout}>Log Out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  });
}(this));
