(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserEditForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
      return {name: "",
              email: "",
              location: "",
              bio: ""};
    },
    componentWillMount: function () {
      UserStore.addCurrentUserListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeCurrentUserListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onChange: function () {
      var user = UserStore.getCurrentUser();
      this.setState(
        {
          name: user.name,
          email: user.email,
          location: user.location,
          bio: user.bio
        }
      );
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.props.history.pushState(null, "/profile");
      }
    },
    handleSubmit: function (e) {
      e.preventDefault();
      var user = {};
      user.name = this.state.name;
      user.email = this.state.email;
      user.location = this.state.location;
      user.bio = this.state.bio;
      ApiUtil.updateCurrentUser(user);
    },
    render: function () {
      return (
        <RB.Grid className="user-edit-info">
          <RB.Row>
            <RB.Col>
              <form onSubmit={this.handleSubmit}>
                <div className="row form-group">
                  <div className="col-md-offset-3 col-md-6">
                    <label>Name: </label>
                    <input type="text" className="form-control"
                           valueLink={this.linkState("name")}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-offset-3 col-md-6">
                    <label>Email: </label>
                    <input type="text" className="form-control"
                           valueLink={this.linkState("email")}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-offset-3 col-md-6">
                    <label>Location:</label>
                    <select className="form-control" valueLink={this.linkState("location")}>
                      {
                        LOCATIONS.map(function(location, idx) {
                          return <option key={idx} valueLink={location}>{location}</option>;
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-offset-3 col-md-6">
                    <label>Bio: </label>
                    <textarea className="form-control" valueLink={this.linkState("bio")}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-offset-3 col-md-5">
                    <RB.Grid>
                      <div className="row form-group">
                        <button type="submit" className="btn btn-default">Update</button>
                        <Link to="profile" className="btn btn-default">Cancel</Link>
                      </div>
                    </RB.Grid>
                  </div>
                </div>
              </form>
            </RB.Col>
          </RB.Row>
        </RB.Grid>
      );
    }
  });
}(this));
