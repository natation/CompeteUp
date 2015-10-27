(function(root) {
  'use strict';
  root.IndexInterests = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all()};
    },
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    componentDidMount: function () {
      InterestStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllInterests();
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
        <RB.ListGroup>
          {
            this.state.interests.map(function (interest, idx) {
              return <RB.ListGroupItem key={idx}
                      onClick={this.props.handleClick.bind(null, interest.name)}>
                       {interest.name}
                     </RB.ListGroupItem>;
            }, this)
          }
        </RB.ListGroup>
      );
    }
  });
}(this));
