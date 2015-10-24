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
                                {width: 200, height: 150, crop: 'fill'});
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
