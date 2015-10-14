(function(root) {
  'use strict';
  root.Competition = React.createClass({
    getInitialState: function () {
      return {competitions: CompetitionStore.all()};
    },
    _onChange: function () {
      this.setState({competitions: CompetitionStore.all()});
    },
    componentDidMount: function () {
      CompetitionStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
      CompetitionStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
        <div>
          <h1>Competitions</h1>
          <ul>
            {
              this.state.competitions.map(function (competition, idx) {
                return <li key={idx}>{competition.name}</li>;
              })
            }
          </ul>
        </div>
      );
    }
  });
}(this));
