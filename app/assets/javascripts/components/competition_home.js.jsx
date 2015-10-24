(function(root) {
  'use strict';

  root.CompetitionHome = React.createClass({
    getInitialState: function () {
      return {events: []};
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
      var events = "none",
          content = [];
      if (this.state.events.length > 0) {
        _.each(this.state.events, function (event, idx) {
            content.push(
              <CompetitionEvent key={idx} {...event}/>
            );
        });
        events = content;
      }
      return (
        <RB.Row>
          <h2>Upcoming Events:</h2>
          {events}
        </RB.Row>
      );
    }
  });
}(this));
