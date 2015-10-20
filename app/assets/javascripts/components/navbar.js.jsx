(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.Navbar = React.createClass({
    handleLogout: function () {
      ApiUtil.logOut();
    },
    render: function () {
      var logoUrl = $.cloudinary.url("logo_iznl6k", { width: 100, height: 70,
                                                    crop: 'scale'});
      var profilePicPublicId = "blank-profile_ox71we";
      var pubId = window.CURRENT_USER_INFO.profilePicUrl;
      if (pubId !== 0) {
        profilePicPublicId = pubId;
      }
      var url = $.cloudinary.url(profilePicPublicId, { height: 30,
                                                    crop: 'scale'});
      return (
        <nav className="navbar navbar-default override-navbar">
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
              <Link to="/"><img src={logoUrl} alt="logo" id="logo"/></Link>
            </div>
            <div className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/find">
                    <strong>Find</strong> a Competition
                  </Link>
                </li>
                <li>
                  <Link to="/startCompetition">
                    <strong>Start</strong> a Competition
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#/profile" className="dropdown-toggle"
                    data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false"
                    id="dropdown">
                      <img src={url}></img>
                      <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#/profile">Profile</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#" onClick={this.handleLogout}>Log Out</a></li>
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
