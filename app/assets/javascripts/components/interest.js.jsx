(function(root) {
  'use strict';
  root.Interest = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all()};
    },
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    componentDidMount: function () {
      InterestStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
        <div>
          <h1>Interests</h1>
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
