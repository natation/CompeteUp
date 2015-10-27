(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
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
      var interests = [],
          header = "";
      if (this.state.interests.length > 0) {
        header = <h4>We're about:</h4>;
        _.each(this.state.interests, function (interest, idx){
          interests.push(
            <Link key={idx} to="find" query={{interest: interest.name}}>
              <RB.Button bsStyle="default">
                {interest.name}
              </RB.Button>
            </Link>
          );
        });
      }
      return (
        <RB.Row>
          {header}
          {interests}
        </RB.Row>
      );
    }
  });
}(this));
