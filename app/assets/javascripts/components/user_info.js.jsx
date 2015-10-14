(function(root) {
  'use strict';
  root.UserInfo = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getCurrentUser()};
    },
    _onChange: function () {
      this.setState({user: UserStore.getCurrentUser()});
    },
    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },
    render: function () {
      var memberSince = "";
      var location = "San Francisco, CA";
      var userName = "";
      var userBio = "";
      if (this.state.user) {
        userName = this.state.user.name;
        userBio = this.state.user.bio;
        memberSince = this.state.user.created_at;
      }
      return (
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-3">
              <h2>{userName}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <h3>Location: </h3>
              {location}
            </div>
            <div className="col-md-5">
              <h3>CompeteUp member since: </h3>
              {memberSince}
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <h3>Bio: </h3>
              {userBio}
            </div>
          </div>
          <UserCompetitions/>
        </div>
      );
    }
  });
}(this));
