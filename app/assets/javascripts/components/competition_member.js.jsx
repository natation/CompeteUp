(function(root) {
  'use strict';
  root.CompetitionMember = React.createClass({
    render: function () {
      return (
        <RB.OverlayTrigger
          trigger="click" rootClose placement="top"
          overlay={
            <RB.Popover title="Bio">
              {this.props.bio}
            </RB.Popover>}>
            <RB.Button
              bsStyle="warning"
              bsSize="large">
              {this.props.name}
            </RB.Button>
        </RB.OverlayTrigger>
      );
    }
  });
}(this));
