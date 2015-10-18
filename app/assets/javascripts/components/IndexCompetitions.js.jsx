(function(root) {
  'use strict';
  root.Competition = React.createClass({
    getInitialState: function () {
      return {competitions: CompetitionStore.all()};
    },
    _onChange: function () {
      this.setState({competitions: CompetitionStore.all()});
    },
    componentDidMount: function () {
      CompetitionStore.addChangeListener(this._onChange);
      ApiUtil.fetchCompetitionMatches();
    },
    componentWillUnmount: function () {
      CompetitionStore.removeChangeListener(this._onChange);
    },
    render: function () {
      var src = "http://res.cloudinary.com/dbgfyqa1e/image/upload/c_limit,h_100,w_150/v1445154603/competition-default_cyldui.png";
      var finished = [];
      var competitionsForRow = [];
      var done = false;
      _.each(this.state.competitions, function (competition, idx) {
        competitionsForRow.push(
          <div key={idx} className="col-md-4">
              <img src={competition.profile_pic_url || src}
                 height="100px"></img>
               <h4>{competition.name}</h4>
          </div>
        );
        if ((idx + 1) % 3 === 0 || idx === this.state.competitions.length - 1) {
          finished.push(
            <div key={idx} className="row">
              {competitionsForRow}
            </div>
          );
          competitionsForRow = [];
        }
      }, this);
      return (
        <div>
          <h1>Competitions</h1>
            {finished}
        </div>
      );
    }
  });
}(this));
