(function(root) {
  'use strict';

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
      document.getElementsByTagName("body")[0].click();
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
        <RB.Col md={12} className="user-interests">
          <h4>Interests:</h4>
          <Link to="profile/editInterests">Edit Interests</Link>
          <RB.Grid className="interests">
            {
              this.state.interests.map(function (interest, idx) {
                return (
                  <RB.Row key={idx}>
                    <RB.OverlayTrigger
                      trigger="click"
                      rootClose
                      placement="left"
                      key={idx}
                      overlay={
                        <RB.Popover title="Competitions with this interest">
                          <UserInterestCompetitions name={interest.name}/>
                          <RB.Button id={interest.name}
                                     onClick={this._removeInterest}
                                     bsSize="xsmall">
                            Remove Interest <RB.Glyphicon glyph="remove-circle"/>
                          </RB.Button>
                        </RB.Popover>}>
                          <RB.Button bsStyle="default">{interest.name}</RB.Button>
                    </RB.OverlayTrigger>
                  </RB.Row>
                );
              }, this)
            }
          </RB.Grid>
        </RB.Col>
      );
    }
  });
}(this));
