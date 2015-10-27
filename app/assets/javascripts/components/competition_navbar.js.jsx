(function(root) {
  'use strict';
  var Jumbotron = ReactBootstrap.Jumbotron;
  var Nav = ReactBootstrap.Nav;
  var NavItem = ReactBootstrap.NavItem;
  root.CompetitionNavbar = React.createClass({
    getInitialState: function () {
      return {joinButtonDisabled: false};
    },
    componentDidMount: function () {
      ApiUtil.fetchCompetitionMatches({getCurrentCompetition: this.props.id});
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.currentUserIsJoined !== this.props.currentUserIsJoined) {
        this.setState({joinButtonDisabled: false});
      }
    },
    _handleJoin: function (e) {
      e.preventDefault();
      this.setState({joinButtonDisabled: true});
      if (this.props.currentUserIsJoined) {
        ApiUtil.toggleJoinCompetition({id: this.props.id});
      } else {
        ApiUtil.toggleJoinCompetition({id: this.props.id, join: true});
      }
    },
    render: function () {
      var c1 = this.props.color1,
          c2 = this.props.color2,
          jumbotronStyle = {background: 'linear-gradient(' + c1 + ', ' + c2 + ')'},
          joinButtonText = "Click to Join!",
          joinButtonStyle = "success";
      if (this.state.joinButtonDisabled) {
        joinButtonText = this.props.currentUserIsJoined ? "Unjoining..." : "Joining...";
        joinButtonStyle = "info";
      } else if (this.props.currentUserIsJoined) {
        joinButtonText = "Unjoin " + this.props.name;
        joinButtonStyle = "danger";
      }
      return (
        <RB.Row>
          <RB.Jumbotron style={jumbotronStyle}>
              <h1>{this.props.name}</h1>
            <RB.Nav bsStyle="pills" activeKey={this.props.selectedKey}
                 onSelect={this.props.handleSelect}>
                  <RB.NavItem eventKey={1} href="">Home</RB.NavItem>
                  <RB.NavItem eventKey={2} href="members">Members</RB.NavItem>
                  <RB.NavItem eventKey={3} href="photos">Photos</RB.NavItem>
                <RB.Col>
                  <RB.Button bsStyle={joinButtonStyle}
                             bsSize="large"
                             onClick={this._handleJoin}
                             disabled={this.state.joinButtonDisabled}>
                    {joinButtonText}
                  </RB.Button>
                </RB.Col>
            </RB.Nav>
          </RB.Jumbotron>
        </RB.Row>
      );
    }
  });
}(this));
