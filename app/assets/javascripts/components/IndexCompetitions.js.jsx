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
      var finished = [];
      var competitionsForRow = [];
      var done = false;
      _.each(this.state.competitions, function (competition, idx) {
        var publicId = "competition-default_cyldui.png";
        if (competition.profile_pic_url) {
          publicId = competition.profile_pic_url;
        }
        var url = $.cloudinary.url(publicId,
                                  { width: 350, height: 230, crop: 'fill'});
        competitionsForRow.push(
          <div key={idx} className="col-md-4 with-margin">
            <Link to={"competitions/" + competition.id}>
              <img alt={competition.name} src={url} className="focus">
                <h2>{competition.name}</h2>
              </img>
            </Link>
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
        <RB.Grid className="competitions">
          {finished}
        </RB.Grid>
      );
    }
  });
}(this));
