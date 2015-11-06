(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.CompetitionHome = React.createClass({
    getInitialState: function () {
      return {events: "",
              competitionIsJoined: false};
    },
    componentDidMount: function () {
      EventStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllEvents({competition_id: this.props.params.id});
      debugger
    },
    componentWillUnmount: function () {
      EventStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function (nextProps) {
      ApiUtil.fetchAllEvents({competition_id: nextProps.params.id});
    },
    _onChange: function () {
      this.setState({events: EventStore.all(),
                     competitionIsJoined: EventStore.competitionIsJoined()});
    },
    render: function () {
      debugger
      var events = "",
          content = [],
          addEventLink = <div></div>;
      if (this.state.events instanceof(Array)) {
        events = "none";
      }
      if (this.state.events.length > 0) {
        _.each(this.state.events, function (e, idx) {
            content.push(
              <CompetitionEvent key={idx} {...e}/>
            );
        });
        events = content;
      }
      if (this.state.competitionIsJoined) {
        addEventLink = (
          <Link to={this.props.location.pathname + "/addEvent"}>Add Event</Link>
        );
      }
      return (
        <RB.Row>
          <h2>Upcoming Events:</h2>
          <div>
            {events}
          </div>
          <div>
            {addEventLink}
          </div>
        </RB.Row>
      );
    }
  });
}(this));
