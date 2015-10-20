(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserInfo = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getUser()};
    },
    _onChange: function () {
      this.setState({user: UserStore.getUser()});
    },
    componentWillMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchCurrentUser();
      this.currentMessages = MessageStore.getDelayedMessages();
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },
    render: function () {
      var userName = "";
      var location = "";
      var userBio = "";
      var memberSince = "";
      if (this.state.user) {
        userName = this.state.user.name;
        location = this.state.user.location;
        userBio = this.state.user.bio;
        memberSince = this.state.user.memberSince;
      }
      var successText = "";
      if (this.currentMessages.length > 0) {
        successText = <div><h3>{this.currentMessages[0]}</h3></div>;
      }
      return (
        <div className="col-md-7">
          {successText}
          <div className="row">
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
