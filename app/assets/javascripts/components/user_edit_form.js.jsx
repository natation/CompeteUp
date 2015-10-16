(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserEditForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function () {
      return {name: "",
              email: "",
              location: "",
              errors: []};
    },
    _onChange: function () {
      var user = UserStore.getCurrentUser();
      this.setState(
        {
          name: user.name,
          email: user.email,
          location: user.location
        }
      );
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessage();
      if (message.status < 400) {
        this.history.pushState(null, "/profile");
      }
      else {
        this.setState({errors: message.responseJSON});
      }
    },
    handleSubmit: function (e) {
      e.preventDefault();
      var user = {};
      user.name = this.state.name;
      user.email = this.state.email;
      user.location = this.state.location;
      ApiUtil.updateCurrentUser(user);
    },
    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    render: function () {
      var errorText = "";
      if (this.state.errors.length > 0) {
        errorText = <h3>{this.state.errors.join(", ")}</h3>;
      }
      return (
        <form onSubmit={this.handleSubmit}>
          {errorText}
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
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="row">
                <button type="submit"
                        className="btn btn-default">
                        Update User
                </button>
              </div>
              <div className="row">
                <Link to="profile" className="btn btn-default">Cancel</Link>
              </div>
            </div>
          </div>
        </form>
      );
    }
  });
}(this));
