(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserProfilePicture = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getUser()};
    },
    _onChange: function () {
      this.setState({user: UserStore.getUser()});
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
                                { width: 200, height: 150, crop: 'fill',
                                  radius: 20});
      return (
        <RB.Col md={12}>
          <RB.Grid>
            <img src={url} alt="Profile Pic"/>

          </RB.Grid>
          <div className="row">
            <Link to="profile/editProfilePic">Edit Profile Pic</Link>
          </div>
        </RB.Col>
      );
    }
  });
}(this));
