(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.CompetitionAddEvent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
      return {
        name: "",
        description: ""
      };
    },
    handleSubmit: function (e) {
      e.preventDefault();
      var curEvent = {};
      curEvent.name = this.state.name;
      curEvent.description = this.state.description;
      curEvent.competition_id = this.props.params.id;
      ApiUtil.createEvent(curEvent);
    },
    render: function () {
      return (
        <RB.Row>
          <RB.Col>
            <form onSubmit={this.handleSubmit}>
              <div className="row form-group">
                <div className="col-md-offset-3 col-md-6">
                  <h2>Add Event</h2>
                  <label>Name: </label>
                  <input type="text" className="form-control"
                         valueLink={this.linkState("name")}/>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-offset-3 col-md-6">
                  <label>Description: </label>
                  <textarea className="form-control"
                            valueLink={this.linkState("description")}></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-offset-3 col-md-5">
                    <button type="submit"
                            className="btn btn-default btn-primary">
                            Create Event
                    </button>
                    <Link
                      to={"competitions/" + this.props.params.id}
                      className="btn btn-default">
                        Cancel
                    </Link>
                </div>
              </div>
            </form>
          </RB.Col>
        </RB.Row>
      );
    }
  });
}(this));
