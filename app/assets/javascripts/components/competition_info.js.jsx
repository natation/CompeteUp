(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.CompetitionInfo = React.createClass({
    getInitialState: function () {
      return {user: {}};
    },
    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUser({id: this.props.competition_owner_id});
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
      this.setState({user: UserStore.getUser()});
    },
    render: function () {
      return (
        <Row>
          <h4>{this.props.location}</h4>
          <h4>Established: {this.props.established}</h4>
          <h4>Organizer:</h4>
            <Link to={"users/" + this.state.user.id}>
              {this.state.user.name}
            </Link>
        </Row>
      );
    }
  });
}(this));
