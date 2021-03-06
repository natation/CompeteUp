(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserInfo = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getCurrentUser()};
    },
    _onChange: function () {
      this.setState({user: UserStore.getCurrentUser()});
    },
    componentWillMount: function () {
      UserStore.addCurrentUserListener(this._onChange);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeCurrentUserListener(this._onChange);
    },
    render: function () {
      var userName = "",
          location = "",
          userBio = "",
          memberSince = "",
          c1 = "",
          c2 = "";
      if (this.state.user) {
        userName = this.state.user.name;
        location = this.state.user.location;
        userBio = this.state.user.bio;
        memberSince = this.state.user.memberSince;
        c1 = this.state.user.color1;
        c2 = this.state.user.color2;
      }
      var bgStyle = {background: 'linear-gradient(' + c1 + ', ' + c2 + ')'};
      return (
        <div className="col-md-7 user-info">
          <div className="row user-name" style={bgStyle}>
            <div className="col-md-3">
              <h2>{userName}</h2>
              <Link to="profile/editUserInfo">Edit Info</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <h4>Location: </h4>
              {location}
            </div>
            <div className="col-md-7">
              <h4>CompeteUp member since: </h4>
              {memberSince}
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <h4>Bio: </h4>
              {userBio}
            </div>
          </div>
          <UserCompetitions/>
        </div>
      );
    }
  });
}(this));
