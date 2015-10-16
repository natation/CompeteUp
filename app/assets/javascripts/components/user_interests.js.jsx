(function(root) {
  'use strict';
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;
  var Popover = ReactBootstrap.Popover;
  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;
  root.UserInterests = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all(),
              message: ""};
    },
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    _onReceiveMessage: function () {
      var receivedMessage = MessageStore.getMessage();
      this.setState({message: receivedMessage.responseJSON});
      ApiUtil.fetchAllInterests({getCurrentUserInterests: true});
    },
    _removeInterest: function (e) {
      ApiUtil.removeInterest(e.currentTarget.id);
    },
    componentDidMount: function () {
      InterestStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchAllInterests({getCurrentUserInterests: true});
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    render: function () {
      var message = "";
      if (this.state.message.length > 0) {
        message = <h4>{this.state.message}</h4>;
      }
      return (
        <div className="col-md-6">
          {message}
          <h3>Interests:</h3>
            {
              this.state.interests.map(function (interest, idx) {
                return (
                  <OverlayTrigger trigger="click" placement="top" key={idx}
                    overlay={
                      <Popover title="Competitions with this interest">
                        <Button id={interest.name} onClick={this._removeInterest}>
                          Remove Interest <Glyphicon glyph="remove-circle"/>
                        </Button>
                      </Popover>}>
                        <Button bsStyle="default">{interest.name}</Button>
                  </OverlayTrigger>
                );
              }, this)
            }
        </div>
      );
    }
  });
}(this));
