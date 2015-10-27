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
      var url,
          image = <div></div>;
      var publicId = this.state.user.profile_pic_url;
      if (publicId) {
        url = $.cloudinary.url(publicId, {width: 50, height: 50, crop: 'fill'});
        image = <img src={url} alt="Profile Pic"/>;
      }
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
                  <RB.Popover title="About the organizer" id="popover">
                    {this.state.user.bio}
                    {image}
                  </RB.Popover>}>
                  <RB.Button bsStyle="warning" bsSize="large">
                    {this.state.user.name}
                  </RB.Button>
              </RB.OverlayTrigger>
          </RB.Row>
        );
      }
      return rendered;
    }
  });
}(this));
