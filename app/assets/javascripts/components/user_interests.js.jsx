(function(root) {
  'use strict';
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;
  var Popover = ReactBootstrap.Popover;
  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;
  var Link = ReactRouter.Link;

  root.UserInterests = React.createClass({
    getInitialState: function () {
      return {interests: InterestStore.all()};
    },
    _onChange: function () {
      this.setState({interests: InterestStore.all()});
    },
    _onReceiveMessage: function () {
      ApiUtil.fetchAllInterests({getCurrentUserInterests: true});
    },
    _removeInterest: function (e) {
      ApiUtil.removeInterest(e.currentTarget.id);
    },
    componentWillMount: function () {
      InterestStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchAllInterests({getCurrentUserInterests: true});
    },
    componentWillUnmount: function () {
      InterestStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    render: function () {
      return (
        <div className="col-md-3">
          <h3>Interests:</h3><Link to="profile/editInterests">Edit Interests</Link>
            {
              this.state.interests.map(function (interest, idx) {
                return (
                  <OverlayTrigger trigger="click" rootClose placement="left" key={idx}
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
