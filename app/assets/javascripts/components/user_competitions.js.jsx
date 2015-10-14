(function(root) {
  'use strict';
  root.UserCompetitions = React.createClass({
    getInitialState: function () {
      return {competitions: CompetitionStore.all()};
    },
    _onChange: function () {
      this.setState({competitions: CompetitionStore.all()});
    },
    componentDidMount: function () {
      CompetitionStore.addChangeListener(this._onChange);
      ApiUtil.fetchCompetitionMatches({getCurrentUserJoinedCompetitions: true});
    },
    componentWillUnmount: function () {
      CompetitionStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
        <div className="row">
          <div className="col-md-7">
            <h3>Competitions:</h3>
            <ul>
              {
                this.state.competitions.map(function (competition, idx) {
                  return <li key={idx}>{competition.name}</li>;
                })
              }
            </ul>
          </div>
        </div>
      );
    }
  });
}(this));
