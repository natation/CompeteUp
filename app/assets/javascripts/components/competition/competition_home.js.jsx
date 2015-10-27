(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.CompetitionHome = React.createClass({
    getInitialState: function () {
      return {events: ""};
    },
    componentDidMount: function () {
      EventStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllEvents({competition_id: this.props.params.id});
    },
    componentWillUnmount: function () {
      EventStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function (nextProps) {
      ApiUtil.fetchAllEvents({competition_id: nextProps.params.id});
    },
    _onChange: function () {
      this.setState({events: EventStore.all()});
    },
    render: function () {
      var events = "",
          content = [];
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
      return (
        <RB.Row>
          <h2>Upcoming Events:</h2>
          <div>
            {events}
          </div>
          <div>
            <Link to={this.props.location.pathname + "/addEvent"}>Add Event</Link>
          </div>
        </RB.Row>
      );
    }
  });
}(this));
