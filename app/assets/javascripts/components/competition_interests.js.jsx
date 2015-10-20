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
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    render: function () {
      return (
        <Row>
          <h4>We're about:</h4>
          <Col md={12}>
            {
              this.state.interests.map(function (interest, idx){
                return (
                  <Button key={idx} bsStyle="default">{interest.name}</Button>
                );
              })
            }
          </Col>
        </Row>

      );
    }
  });
}(this));
