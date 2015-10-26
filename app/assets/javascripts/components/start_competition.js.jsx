(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.StartCompetition = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
      return {
        location: "San Francisco, CA",
        checkedInterests: [],
        name: "",
        description: ""
      };
    },
    componentWillMount: function () {
      MessageStore.addChangeListener(this._onReceiveMessage);
      this.profilePicUrl = "";
    },
    componentWillUnmount: function () {
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.props.history.pushState(null, "/");
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
      var competition = {};
      var interest_ids = [""];
      _.each(this.state.checkedInterests, function (interest) {
        interest_ids.push(interest.id);
      }, this);
      competition.interest_ids = interest_ids;
      competition.location = this.state.location;
      competition.name = this.state.name;
      competition.description = this.state.description;
      if (this.profilePicUrl) {
        competition.profile_pic_url = this.profilePicUrl;
      }
      ApiUtil.createCompetition(competition);
    },
    render: function () {
      return (
        <RB.Grid className="start-competition">
          <RB.Row>
            <RB.Col>
              <form onSubmit={this.handleSubmit}>
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
                    <label className="associate-label">Associated Interests: </label>
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
                    <label>Description: </label>
                    <textarea className="form-control"
                              valueLink={this.linkState("description")}></textarea>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-offset-3 col-md-6">
                    <button className="btn btn-default"
                            onClick={this.handleNewPicUpload}
                            id="uploadWidget">
                              Add Competition Profile Picture
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-offset-3 col-md-5">
                      <button type="submit"
                              className="btn btn-default btn-primary">
                              Create Competition
                      </button>
                      <Link to="/" className="btn btn-default">Cancel</Link>
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
