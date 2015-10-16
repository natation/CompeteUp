(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.UserEditInterests = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all(),
              checkHappened: false,
              errors: ""};
    },
    componentWillMount: function () {
      InterestStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchAllInterests({getCurrentUserInterests: true});
      this.checkedInterests = [];
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onChange: function () {
      this.checkedInterests = InterestStore.all();
      this.setState({interests: InterestStore.all()});
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
    handleCheckboxClicked: function (e) {
      var clickedInterest = {id: parseInt(e.target.value), name: e.target.name};
      var foundInterestIdx = _.findIndex(this.checkedInterests,
                                      {id: clickedInterest.id});
      if (foundInterestIdx < 0) {
        this.checkedInterests.push(clickedInterest);
      } else {
        this.checkedInterests.splice(foundInterestIdx, 1);
      }
      this.setState({checkHappened: !this.state.checkHappened});
    },
    render: function () {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="row form-group">
            <div className="col-md-offset-3 col-md-6">
              <label>Interests: </label>
              <input type="hidden" name="user[interests][]" value=""/>
              {
                window.INTERESTS.map(function (interest, idx) {
                  var foundInterestIdx = _.findIndex(this.checkedInterests,
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
          <div className="col-md-offset-3 col-md-2">
            <button type="submit" className="btn btn-default">Update Interests</button>
          </div>
          <div className="col-md-2">
            <Link to="profile" className="btn btn-default">Cancel</Link>
          </div>
        </div>
      </form>

);
    }
  });
}(this));
