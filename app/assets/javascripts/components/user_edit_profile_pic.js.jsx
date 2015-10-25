(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserEditProfilePic = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getCurrentUser()};
    },
    componentWillMount: function () {
      UserStore.addCurrentUserListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      this.profilePicUrl = "";
    },
    componentWillUnmount: function () {
      UserStore.removeCurrentUserListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onChange: function () {
      this.setState({user: UserStore.getCurrentUser()});
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.props.history.pushState(null, "/profile");
      }
    },
    handleNewPicUpload: function (e) {
      e.preventDefault();
      var that = this;
      cloudinary.openUploadWidget({cloud_name: cloud_name,
                                    upload_preset: upload_preset},
        function(error, result) {
          if (result) {
            var $widget = $("#uploadWidget");
            $widget.text("Upload Successful");
            $widget.append("<p>" + result[0].original_filename + "</p>");
            that.profilePicUrl = result[0].public_id;
          }
        }
      );
    },
    handleSubmit: function (e) {
      e.preventDefault();
      var user = {};
      user.profile_pic_url = this.profilePicUrl;
      ApiUtil.updateCurrentUser(user);
    },
    render: function () {
      var publicId = "blank_profile_qqetgr.png";
      if (typeof this.state.user !== "undefined") {
        if (this.state.user.profile_pic_url) {
          publicId = this.state.user.profile_pic_url;
        }
      }
      var url = $.cloudinary.url(publicId,
                                {width: 100, height: 150, crop: 'fill'});
      return (
        <RB.Grid className="user-edit-profile-pic">
          <RB.Row>
            <RB.Col md={3} mdOffset={3}>
              <img src={url} alt="Profile Pic"/>
            </RB.Col>
          </RB.Row>
          <RB.Row>
            <RB.Col md={4} mdOffset={3}>
              <form onSubmit={this.handleSubmit}>
                <div className="row form-group">
                    <button className="btn btn-default"
                            onClick={this.handleNewPicUpload}
                            id="uploadWidget">
                              Change Profile Picture
                    </button>
                    <button type="submit"
                            className="btn btn-default btn-primary">
                              Save
                    </button>
                    <Link to="profile" className="btn btn-default">Cancel</Link>
                </div>
              </form>
            </RB.Col>
          </RB.Row>
        </RB.Grid>
      );
    }
  });
}(this));
