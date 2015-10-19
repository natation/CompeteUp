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
      var publicId = "blank-profile_ox71we";
      if (typeof this.state.user !== "undefined") {
        if (this.state.user.profile_pic_url) {
          publicId = this.state.user.profile_pic_url;
        }
      }
      var url = $.cloudinary.url(publicId,
                                { width: 100, height: 150, crop: 'fill',
                                  radius: 20});
      return (
        <div className="col-md-6">
          <h3>Profile Pic</h3>
          <img src={url} alt="Profile Pic"/>
          <div className="row">
            <Link to="profile/editProfilePic">Edit Profile Pic</Link>
          </div>
        </div>
      );
    }
  });
}(this));
