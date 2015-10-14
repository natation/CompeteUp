(function(root) {
  'use strict';
  root.UserInterests = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all()};
    },
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    componentDidMount: function () {
      InterestStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllInterests({getCurrentUserInterests: true});
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
        <div className="col-md-6">
          <h3>Interests:</h3>
          <ul>
          {
            this.state.interests.map(function (interest, idx) {
              return <li key={idx}>{interest.name}</li>;
            })
          }
          </ul>
        </div>
      );
    }
  });
}(this));
