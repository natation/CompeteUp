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
        default:
          selectedKey = 1;
      }
      return {competition: {},
              selectedKey: selectedKey};
    },
    componentWillMount: function () {
      CompetitionStore.addChangeListener(this._onChange);
      ApiUtil.fetchCompetitionMatches({getCurrentCompetition: this.props.params.id});
      this.basePath = "/competitions/" + this.props.params.id + "/";
    },
    componentWillUnmount: function () {
      CompetitionStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
      this.setState({competition: CompetitionStore.getCurrentCompetition()});
    },
    handleCompetitionNavbarSelect: function (selectedKey, path) {
      this.setState({selectedKey: selectedKey});
      this.props.history.pushState(null, this.basePath + path);
    },
    render: function () {
      return (
        <div className="container">
          <CompetitionNavbar selectedKey={this.state.selectedKey}
                             name={this.state.competition.name}
                             handleSelect={this.handleCompetitionNavbarSelect}/>
          <div className="row">
            <div className="col-md-4">
              <CompetitionSidebar />
            </div>
            <div className="col-md-8">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
