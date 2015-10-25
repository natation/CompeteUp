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
      UserStore.addCurrentUserListener(this._onChange);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeCurrentUserListener(this._onChange);
    },
    render: function () {
      var publicId = "blank_profile_qqetgr";
      if (typeof this.state.user !== "undefined") {
        if (this.state.user.profile_pic_url) {
          publicId = this.state.user.profile_pic_url;
        }
      }
      var url = $.cloudinary.url(publicId,
                                {width: 200, height: 200, crop: 'scale'});
      return (
        <RB.Col md={12}>
          <RB.Grid>
            <RB.Row className="profile-pic">
              <RB.Col>
                <img src={url} alt="Profile Pic"/>
              </RB.Col>
            </RB.Row>
            <RB.Row>
              <RB.Col>
                <Link to="profile/editProfilePic">Change Profile Pic</Link>
              </RB.Col>
            </RB.Row>
          </RB.Grid>
        </RB.Col>
      );
    }
  });
}(this));
