(function(root) {
  'use strict';
  root.CompetitionInterests = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all()};
    },
    componentDidMount: function () {
      InterestStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllInterests({getCurrentCompetitionInterests: this.props.id});
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function (nextProps) {
      ApiUtil.fetchAllInterests({getCurrentCompetitionInterests: nextProps.id});
    },
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    render: function () {
      var interests = [];
      if (this.state.interests.length > 0) {
        interests.push(<h4>We're about:</h4>);
        interests.push(
          <RB.Col md={12}>
            {
              this.state.interests.map(function (interest, idx){
                return (
                  <RB.Button key={idx} bsStyle="default">
                    {interest.name}
                  </RB.Button>
                );
              })
            }
          </RB.Col>
        );
      }
      return (
        <RB.Row>
          {interests}
        </RB.Row>
      );
    }
  });
}(this));
