(function(root) {
  'use strict';
  root.Index = React.createClass({
    getInitialState: function () {
      return {user: UserStore.getCurrentUser()};
    },
    _onChange: function () {
      this.setState({user: UserStore.getCurrentUser()});
    },
    componentWillMount: function () {
      UserStore.addCurrentUserListener(this._onChange);
      ApiUtil.fetchCurrentUser();
    },
    componentWillUnmount: function () {
      UserStore.removeCurrentUserListener(this._onChange);
    },
    render: function () {
      var search = this.props.location.search,
          interestIdx = search.lastIndexOf("="),
          interest;
      if (interestIdx > 0) {
        interest = search.substr(interestIdx + 1);
      }
      return (
        <div className="container-fluid">
          <RB.Row>
            <RB.Jumbotron className="jumbotron-main">
              <h2>Welcome, {this.state.user.name}!</h2>
            </RB.Jumbotron>
          </RB.Row>
          <RB.Grid className="search-bar">
            <IndexSearchBar interest={interest}/>
          </RB.Grid>
          <IndexCompetitions/>
        </div>
      );
    }
  });
}(this));
