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
      var competitionHeader = "",
          competitionsRow = [],
          competitions = [];
      if (this.state.competitions.length > 0) {
        competitionHeader = <h4>Entered Competitions:</h4>;
      }
      _.each(this.state.competitions, function (competition, idx, list) {
        competitionsRow.push(
          <RB.Button key={idx}
            href={"#/competitions/" + competition.id}>
             {competition.name}
          </RB.Button>
        );
        if (competitionsRow.length >= 3 ||
            idx === list.length - 1) {
          competitions.push(
            <RB.Col key={idx}>
              {competitionsRow}
            </RB.Col>
          );
          competitionsRow = [];
        }
      });
      return (
        <RB.Row className="user-competitions">
          <RB.Col md={7}>
            {competitionHeader}
            <RB.Grid>
              <RB.Row>
                {competitions}
              </RB.Row>
            </RB.Grid>
          </RB.Col>
        </RB.Row>
      );
    }
  });
}(this));
