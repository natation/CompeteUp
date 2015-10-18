(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserEditProfilePic = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getCurrentUser(),
              errors: ""};
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
      this.setState({user: UserStore.getCurrentUser()});
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.props.history.pushState(null, "/profile");
      }
      else {
        this.setState({errors: message.responseJSON});
      }
    },
    handleNewPicUpload: function (e) {
      e.preventDefault();
      var that = this;
      cloudinary.openUploadWidget({ cloud_name: 'dbgfyqa1e',
                                    upload_preset: 'm50nybft'},
        function(error, result) {
          if (result) {
            var $widget = $("#uploadWidget");
            $widget.text("Upload Successful");
            $widget.append("<p>" + result[0].original_filename + "</p>");
            that.profilePicUrl = result[0].url;
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
      var errorText = "";
      if (this.state.errors.length > 0) {
        errorText = <h3>{this.state.errors.join(", ")}</h3>;
      }
      var url = "http://res.cloudinary.com/dbgfyqa1e/image/upload/v1445067162/blank-profile_ox71we.jpg";
      if (typeof this.state.user !== "undefined") {
        url = this.state.user.profile_pic_url || url;
      }
      return (
        <form onSubmit={this.handleSubmit}>
          <img src={url} alt="Profile Pic" height="100px"/>
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
      );
    }
  });
}(this));