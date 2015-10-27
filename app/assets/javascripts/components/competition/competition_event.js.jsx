(function(root) {
  'use strict';
  root.CompetitionEvent = React.createClass({
    getInitialState: function () {
      return {open: false};
    },
    _handleClick: function () {
      this.setState({open: !this.state.open});
    },
    render: function () {
      return (
        <div>
          <RB.Button onClick={this._handleClick}>
            {this.props.name}
          </RB.Button>
          <RB.Panel collapsible expanded={this.state.open}>
            {this.props.description}
          </RB.Panel>
        </div>
      );
    }
  });
}(this));
