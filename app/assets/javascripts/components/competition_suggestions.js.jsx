(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
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
    componentWillReceiveProps: function (nextProps) {
      ApiUtil.fetchCompetitionSuggestions({suggestionFor: nextProps.id});
    },
    _onChange: function () {
      this.setState({competitions: CompetitionStore.allSuggestions()});
    },
    render: function () {
      var contents = [];
      var rendered = <RB.Row></RB.Row>;
      if (this.state.competitions.length > 0) {
        _.each(this.state.competitions, function (competition, idx) {
          contents.push(
             <li key={idx}>
                <a href={"#/competitions/" + competition.id}>
                  {competition.name}
                </a>
             </li>
          );
        });
        rendered = (
          <RB.Row>
            <h3>Other competition suggestions</h3>
            {contents}
          </RB.Row>
        );
      }
      return rendered;
    }
  });
}(this));
