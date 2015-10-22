(function(root) {
  'use strict';
  root.CompetitionProfile = React.createClass({
    getInitialState: function () {
      var selectedIdx = this.props.location.pathname.lastIndexOf("/");
      var selectedName = this.props.location.pathname.substr(selectedIdx + 1);
      var selectedKey = 1;
      switch (selectedName) {
        case "members":
          selectedKey = 2;
          break;
        case "photos":
          selectedKey = 3;
        break;
      }
      return {competition: {},
              selectedKey: selectedKey};
    },
    componentWillMount: function () {
      CompetitionStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchCompetitionMatches({getCurrentCompetition: this.props.params.id});
      this.basePath = "/competitions/" + this.props.params.id + "/";
    },
    componentWillUnmount: function () {
      CompetitionStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    _onChange: function () {
      this.setState({competition: CompetitionStore.getCurrentCompetition()});
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.handleCompetitionNavbarSelect(1, "home");
      }
    },
    handleCompetitionNavbarSelect: function (selectedKey, path) {
      if (path !== "join") {
        this.setState({selectedKey: selectedKey});
        this.props.history.pushState(null, this.basePath + path);
      } else {
        ApiUtil.joinCompetition({id: this.props.params.id});
      }
    },
    render: function () {
      var rendered = <RB.Grid></RB.Grid>;
      if (this.state.competition.name) {
        rendered = (
          <RB.Grid>
            <CompetitionNavbar selectedKey={this.state.selectedKey}
                               name={this.state.competition.name}
                               handleSelect={this.handleCompetitionNavbarSelect}/>
            <RB.Row>
              <RB.Col md={4}>
                <CompetitionSidebar {...this.state.competition}/>
              </RB.Col>
              <RB.Col md={8}>
                {this.props.children}
              </RB.Col>
            </RB.Row>
          </RB.Grid>
        );
      }
      return rendered;
    }
  });
}(this));
