(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserProfilePicture = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getCurrentUser()};
    },
    _onChange: function () {
      this.setState({user: UserStore.getCurrentUser()});
    },
    componentWillMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },
    render: function () {
      var url = "http://res.cloudinary.com/dbgfyqa1e/image/upload/v1445067162/blank-profile_ox71we.jpg";
      if (typeof this.state.user !== "undefined") {
        url = this.state.user.profile_pic_url || url;
      }
      return (
        <div className="col-md-6">
          <h3>Profile Pic</h3>
          <img src={url} alt="Profile Pic" height="100px"/>
          <div className="row">
            <Link to="profile/editProfilePic">Edit Profile Pic</Link>
          </div>
        </div>
      );
    }
  });
}(this));
