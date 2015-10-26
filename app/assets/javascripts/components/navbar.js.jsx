(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.Navbar = React.createClass({
    getInitialState: function () {
      return {currentUser: UserStore.getCurrentUser()};
    },
    componentDidMount: function () {
      UserStore.addCurrentUserListener(this._onChange);
      ApiUtil.fetchCurrentUser();
      this.scrollToSearchBar();
    },
    componentWillUnmount: function () {
      UserStore.removeCurrentUserListener(this._onChange);
    },
    _onChange: function () {
      this.setState({currentUser: UserStore.getCurrentUser()});
    },
    handleLogout: function (e) {
      e.preventDefault();
      ApiUtil.logOut();
    },
    scrollToSearchBar: function () {
      setTimeout(function () {
        if (window.location.hash.match(/#\/find/)) {
          var searchBarOffsetTop =
                $('.search-bar').offset().top - $('.navbar').outerHeight();
          $('body').animate({scrollTop: searchBarOffsetTop}, 'slow');
        }
      }.bind(this), 0);
    },
    componentWillReceiveProps: function () {
      this.scrollToSearchBar();
    },
    render: function () {
      var profilePicPublicId = "blank_profile_qqetgr";
      var nav = <nav></nav>;
      if (this.state.currentUser.name) {
        if (this.state.currentUser.profile_pic_url) {
          profilePicPublicId = this.state.currentUser.profile_pic_url;
        }
        var url = $.cloudinary.url(profilePicPublicId, {height: 30,
                                                      crop: 'scale',
                                                      radius: 20});
        nav = (
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
                <Link to="/"><img src="/assets/logo.png" alt="logo" id="logo"/></Link>
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
                      <li><a href="/#" onClick={this.handleLogout}>Log Out</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
      }
      return nav;
    }
  });
}(this));
