(function(root) {
  'use strict';
  root.UserEditForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
      return {name: "",
              email: "",
              location: ""};
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
    handleSubmit: function (e) {
      e.preventDefault();
    },
    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
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
              <select className="form-control" value={this.linkState("location")}>
                {
                  LOCATIONS.map(function(location, idx) {
                    return <option key={idx} value={location}>{location}</option>;
                  })
                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <button type="submit" className="btn btn-default">Update User</button>
            </div>
          </div>
        </form>
      );
    }
  });
}(this));
