(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.StartCompetition = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
      return {
        location: "",
        checkedInterests: InterestStore.all(),
        name: "",
        description: "",
        errors: []
      };
    },
    componentWillMount: function () {
      InterestStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      this.profilePicUrl = "";
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onChange: function () {
      this.setState({checkedInterests: InterestStore.all()});
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
    handleCheckboxClicked: function (e) {
      var clickedInterest = {id: parseInt(e.target.value), name: e.target.name};
      var foundInterestIdx = _.findIndex(this.state.checkedInterests,
                                      {id: clickedInterest.id});
      if (foundInterestIdx < 0) {
        this.state.checkedInterests.push(clickedInterest);
      } else {
        this.state.checkedInterests.splice(foundInterestIdx, 1);
      }
      this.setState({checkedInterests: this.state.checkedInterests});
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
      var competition = {};
      var interest_ids = [""];
      _.each(this.state.checkedInterests, function (interest) {
        interest_ids.push(interest.id);
      }, this);
      competition.interest_ids = interest_ids;
      competition.location = this.state.location;
      competition.name = this.state.name;
      competition.description = this.state.description;
      user.profile_pic_url = this.profilePicUrl;
      ApiUtil.createCompetition(competition);
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
              <label>Interests: </label>
              {
                window.INTERESTS.map(function (interest, idx) {
                  var foundInterestIdx = _.findIndex(this.state.checkedInterests,
                                                  {name: interest.name});
                  var isChecked = true;
                  if (foundInterestIdx < 0) {
                    isChecked = false;
                  }
                  return (
                    <label key={idx} className="checkbox-inline">
                      <input
                        type="checkbox"
                        name={interest.name}
                        value={interest.id}
                        onChange={this.handleCheckboxClicked}
                        checked={isChecked}>
                          {interest.name}
                      </input>
                    </label>
                  );
                }, this)
              }
            </div>
          </div>
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
          <div className="row">
            <div className="col-md-offset-3 col-md-5">
              <div className="row">
                <button type="submit"
                        className="btn btn-default">
                        Create Competition
                </button>
              </div>
              <div className="col-md-4">
                <Link to="/" className="btn btn-default">Cancel</Link>
              </div>
            </div>
          </div>
        </form>
      );
    }
  });
}(this));
