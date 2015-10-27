(function(root) {
  'use strict';
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
            <RB.OverlayTrigger
              trigger="click" rootClose placement="right"
              overlay={
                <RB.Popover title="About us">
                  {this.props.description}
                </RB.Popover>}>
                <RB.Button bsStyle="default">About us...</RB.Button>
            </RB.OverlayTrigger>
            <h4>Organizer:</h4>
              <RB.OverlayTrigger
                trigger="click" rootClose placement="right"
                overlay={
                  <RB.Popover title="About the organizer">
                    {this.state.user.bio}
                  </RB.Popover>}>
                  <a href="">{this.state.user.name}</a>
              </RB.OverlayTrigger>
          </RB.Row>
        );
      }
      return rendered;
    }
  });
}(this));
