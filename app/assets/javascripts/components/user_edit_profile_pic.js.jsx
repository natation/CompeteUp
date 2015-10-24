(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserEditProfilePic = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getUser()};
    },
    componentWillMount: function () {
      UserStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      this.profilePicUrl = "";
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onChange: function () {
      this.setState({user: UserStore.getUser()});
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
      var publicId = "blank-profile_ox71we.png";
      if (typeof this.state.user !== "undefined") {
        if (this.state.user.profile_pic_url) {
          publicId = this.state.user.profile_pic_url;
        }
      }
      var url = $.cloudinary.url(publicId,
                                { width: 100, height: 150, crop: 'fill',
                                  radius: 20});
      return (
        <RB.Grid>
          <form onSubmit={this.handleSubmit}>
            <img src={url} alt="Profile Pic"/>
            <div className="row form-group">
              <div className="col-md-offset-2 col-md-3">
                <button className="btn btn-default"
                        onClick={this.handleNewPicUpload}
                        id="uploadWidget">
                          Upload New Profile Picture
                </button>
              </div>
              <div className="col-md-3">
                <button type="submit"
                        className="btn btn-default">
                          Update Profile Picture
                </button>
              </div>
              <div className="col-md-3">
                <Link to="profile" className="btn btn-default">Cancel</Link>
              </div>
            </div>
          </form>
        </RB.Grid>
      );
    }
  });
}(this));
