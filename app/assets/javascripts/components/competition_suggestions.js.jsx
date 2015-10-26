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
      $('body').animate({scrollTop: 0}, 'slow');
    },
    _onChange: function () {
      this.setState({competitions: CompetitionStore.allSuggestions()});
    },
    render: function () {
      var contents = [],
          finished = [],
          rendered = <RB.Row></RB.Row>;
      if (this.state.competitions.length > 0) {
        _.each(this.state.competitions, function (competition, idx, list) {
          contents.push(
            <RB.Button key={idx}
              href={"#/competitions/" + competition.id}>
               {competition.name}
            </RB.Button>
          );
          if (contents.length >= 3 ||
              idx === list.length - 1) {
            finished.push(
              <RB.Col key={idx}>
                {contents}
              </RB.Col>
            );
            contents = [];
          }
        });
        rendered = (
          <RB.Row>
            <h4>Other competition suggestions: </h4>
            <RB.Col>
              {finished}
            </RB.Col>
          </RB.Row>
        );
      }
      return rendered;
    }
  });
}(this));
