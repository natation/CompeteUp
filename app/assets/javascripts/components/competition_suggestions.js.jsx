(function(root) {
  'use strict';
  root.CompetitionSuggestions = React.createClass({
    getInitialState: function () {
      return {competitions: CompetitionStore.allSuggestions()};
    },
    componentWillMount: function () {
      CompetitionStore.addSuggestionsListener(this._onChange);
      ApiUtil.fetchCompetitionSuggestions({suggestionFor: this.props.id});
    },
    componentWillUnmount: function () {
      CompetitionStore.removeSuggestionsListener(this._onChange);
    },
    _onChange: function () {
      this.setState({competitions: CompetitionStore.allSuggestions()});
    },
    render: function () {
      return (
        <Row>
          <h4>Other suggested competitions</h4>
          <ul>
            {
              this.state.competitions.map(function (competition, idx) {
                return <li key={idx}>{competition.name}</li>;
              })
            }
          </ul>
        </Row>
      );
    }
  });
}(this));
