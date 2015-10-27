(function(root) {
  'use strict';
  root.CompetitionMembers = React.createClass({
    getInitialState: function () {
      return {members: []};
    },
    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllUsers({competition_id: this.props.params.id});
    },
    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
      this.setState({members: UserStore.all()});
    },
    render: function () {
      var rendered = "",
          memberList = [];
      _.each(this.state.members, function (member, idx) {
        memberList.push(
          <CompetitionMember key={idx } {...member}/>
          );
      });
      if (memberList.length > 0) {
        rendered = <RB.ListGroup>
                      {memberList}
                   </RB.ListGroup>;
      }
      return (
        <RB.Row>
          <h2>Members:</h2>
          {rendered}
        </RB.Row>
      );
    }
  });
}(this));
