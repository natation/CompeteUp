(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  root.IndexCompetitions = React.createClass({
    getInitialState: function () {
      return {competitions: CompetitionStore.all(),
              displayNum: 9};
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
      var finished = [],
          competitionsForRow = [],
          done = false,
          interestName = "";
      _.each(this.state.competitions, function (competition, idx) {
        if (done) {
          return;
        }
        var publicId = competition.profile_pic_url;
        var url = $.cloudinary.url(publicId,
                                  { width: 300, height: 230, crop: 'fill'});
        interestName = competition.interestName;
        competitionsForRow.push(
          <div key={idx} className="col-md-4">
            <Link to={"competitions/" + competition.id}>
              <img alt={competition.name} src={url} className="competition-focus">
                <h2>{competition.name}</h2>
              </img>
            </Link>
          </div>
        );
        if ((idx + 1) % 3 === 0 || idx === this.state.competitions.length - 1) {
          finished.push(
            <div key={idx} className="row with-top-padding">
              {competitionsForRow}
            </div>
          );
          if (idx + 1 >= this.state.displayNum) {
            done = true;
          }
          competitionsForRow = [];
        }
      }, this);
      var header = "";
      if (finished.length === 0) {
        header = <h2>No competitions found</h2>;
      } else if (interestName) {
        header = <h2>Competitions with interest: {interestName}</h2>;
      }
      return (
        <RB.Grid className="competitions">
          {header}
          {finished}
        </RB.Grid>
      );
    }
  });
}(this));
