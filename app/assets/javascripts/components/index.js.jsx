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
      return (
        <div className="container-fluid">
          <RB.Row>
            <RB.Jumbotron className="jumbotron-main">
              <h2>Welcome, {this.state.user.name}!</h2>
            </RB.Jumbotron>
          </RB.Row>
          <RB.Grid className="search-bar">
            <SearchBar/>
          </RB.Grid>
          <IndexCompetitions/>
        </div>
      );
    }
  });
}(this));
