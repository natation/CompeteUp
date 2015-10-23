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
      var competitionHeader = "";
      if (this.state.competitions.length > 0) {
        competitionHeader = <h4>Entered Competitions:</h4>;
      }
      return (
        <RB.Row>
          <RB.Col md={7}>
            {competitionHeader}
            <RB.ListGroup className="user-competitions">
              {
                this.state.competitions.map(function (competition, idx) {
                  return <RB.ListGroupItem key={idx}
                          href={"#/competitions/" + competition.id}>
                           {competition.name}
                         </RB.ListGroupItem>;
                }, this)
              }
            </RB.ListGroup>
          </RB.Col>
        </RB.Row>
      );
    }
  });
}(this));
