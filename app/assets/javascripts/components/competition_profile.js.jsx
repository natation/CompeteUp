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
              selectedKey: selectedKey,
              navColors: ["", ""]};
    },
    componentDidMount: function () {
      CompetitionStore.addChangeListener(this._onChange);
      MessageStore.addChangeListener(this._onReceiveMessage);
      ApiUtil.fetchCompetitionMatches({getCurrentCompetition: this.props.params.id});
      this.basePath = "/competitions/" + this.props.params.id + "/";
    },
    componentWillUnmount: function () {
      CompetitionStore.removeChangeListener(this._onChange);
      MessageStore.removeChangeListener(this._onReceiveMessage);
    },
    componentWillReceiveProps: function (nextProps) {
      this.state.selectedKey = 1;
      ApiUtil.fetchCompetitionMatches({getCurrentCompetition: nextProps.params.id});
      this.basePath = "/competitions/" + nextProps.params.id + "/";
      if (nextProps.colors) {
        this.setState({navColors: nextProps.colors});
      }
    },
    _onChange: function () {
      var competition = CompetitionStore.getCurrentCompetition();
      this.setState({competition: competition});
      if (competition.colors) {
        this.setState({navColors: competition.colors});
      }
    },
    _onReceiveMessage: function () {
      var message = MessageStore.getMessages();
      if (message.status < 400) {
        this.handleCompetitionNavbarSelect(1, "");
      }
    },
    handleCompetitionNavbarSelect: function (selectedKey, path) {
        this.setState({selectedKey: selectedKey});
        this.props.history.pushState(null, this.basePath + path);
    },
    render: function () {
      var rendered = <RB.Grid></RB.Grid>;
      if (this.state.competition.name) {
        rendered = (
          <RB.Grid className="competition-profile">
            <CompetitionNavbar selectedKey={this.state.selectedKey}
                               {...this.state.competition}
                               navColors={this.state.navColors}
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
