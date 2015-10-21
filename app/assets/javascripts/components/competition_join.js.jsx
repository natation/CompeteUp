(function(root) {
  'use strict';
  root.CompetitionJoin = React.createClass({
    getInitialState: function () {
      return {errors: ""};
    },
    componentWillMount: function () {
      MessageStore.addChangeListener(this._onReceiveMessage);
    },
    componentWillUnmount: function () {
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.props.history.pushState(null, "/profile");
      }
      else {
        this.setState({errors: message.responseJSON});
      }
    },
    _handleJoin: function () {
      ApiUtil.joinCompetition(this.props.params.id);
    },
    render: function () {
      var errorText = "";
      if (this.state.errors.length > 0) {
        errorText = <h3>{this.state.errors.join(", ")}</h3>;
      }
      return <RB.Button onClick={this._handleJoin}>Join</RB.Button>;
    }
  });
}(this));
