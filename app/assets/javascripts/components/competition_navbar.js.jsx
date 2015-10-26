(function(root) {
  'use strict';
  var Jumbotron = ReactBootstrap.Jumbotron;
  var Nav = ReactBootstrap.Nav;
  var NavItem = ReactBootstrap.NavItem;
  root.CompetitionNavbar = React.createClass({
    render: function () {
      var c1 = this.props.colors[0],
          c2 = this.props.colors[1],
          jumbotronStyle = {background: 'linear-gradient(' + c1 + ', ' + c2 + ')'};
      return (
        <RB.Row>
          <Jumbotron style={jumbotronStyle}>
          <h1>{this.props.name}</h1>
            <Nav bsStyle="pills" activeKey={this.props.selectedKey}
                 onSelect={this.props.handleSelect}>
              <NavItem eventKey={1} href="">Home</NavItem>
              <NavItem eventKey={2} href="members">Members</NavItem>
              <NavItem eventKey={3} href="photos">Photos</NavItem>
              <NavItem eventKey={4} href="join">Join Us!</NavItem>
            </Nav>
          </Jumbotron>
        </RB.Row>
      );
    }
  });
}(this));
