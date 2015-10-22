(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.CompetitionInfo = React.createClass({
    getInitialState: function () {
      return {user: {}};
    },
    componentDidMount: function () {
      UserStore.addOrganizerChangeListener(this._onChange);
      ApiUtil.fetchOrganizer({showUserById: this.props.competition_owner_id});
    },
    componentWillUnmount: function () {
      UserStore.removeOrganizerChangeListener(this._onChange);
    },
    componentWillReceiveProps: function (nextProps) {
      ApiUtil.fetchOrganizer({showUserById: nextProps.competition_owner_id});
    },
    _onChange: function () {
      this.setState({user: UserStore.getOrganizer()});
    },
    render: function () {
      var rendered = <RB.Row></RB.Row>;
      if (this.props.name) {
        rendered = (
          <RB.Row>
            <h4>{this.props.location}</h4>
            <h4>Established: {this.props.established}</h4>
            <h4>Organizer:</h4>
              <Link to={"users/" + this.state.user.id}>
                {this.state.user.name}
              </Link>
          </RB.Row>
        );
      }
      return rendered;
    }
  });
}(this));
