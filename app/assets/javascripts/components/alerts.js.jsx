(function(root) {
  'use strict';
  root.Alerts = React.createClass({
    getInitialState: function () {
      return {alertVisible: false,
              alertType: "",
              message: ""};
    },
    componentWillMount: function () {
      MessageStore.addChangeListener(this._onReceiveMessage);
    },
    componentWillUnmount: function () {
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onReceiveMessage: function () {
      var receivedMessage = MessageStore.getDelayedMessages();
      var alertType = "";
      if (receivedMessage.status < 400) {
        alertType = "success";
      }
      else {
        alertType = "danger";
      }
      this.setState({alertVisible: true,
                     alertType: alertType,
                     message: receivedMessage.responseJSON});
    },
    handleAlertDismiss: function () {
      this.setState({alertVisible: false});
    },
    handleAlertShow: function () {
      this.setState({alertVisible: true});
    },
    render: function () {
      var alert = "";
      if (this.state.alertVisible) {
        alert = (
          <RB.Alert bsStyle={this.state.alertType}
                    onDismiss={this.handleAlertDismiss}
                    dismissAfter={2000}>
            {this.state.message}
          </RB.Alert>
        );
      }
      return (
        <div className="alerts">
          {alert}
        </div>
      );
    }
  });
}(this));
