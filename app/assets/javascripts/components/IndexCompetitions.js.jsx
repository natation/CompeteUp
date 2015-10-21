(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
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
      var publicId = "competition-default_cyldui.png";
      var finished = [];
      var competitionsForRow = [];
      var done = false;
      _.each(this.state.competitions, function (competition, idx) {
        if (competition.profile_pic_url) {
          publicId = competition.profile_pic_url;
        }
        var url = $.cloudinary.url(publicId,
                                  { width: 350, crop: 'fill',
                                    radius: 20});
        competitionsForRow.push(
          <div key={idx} className="col-md-4">
            <Link to={"competitions/" + competition.id}>
              <img alt={competition.name} src={url}></img>
            </Link>
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
        <RB.Grid className="main-content">
          <h1>Competitions</h1>
            {finished}
        </RB.Grid>
      );
    }
  });
}(this));
