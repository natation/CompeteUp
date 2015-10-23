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
      var finished = [];
      var competitionsForRow = [];
      var done = false;
      _.each(this.state.competitions, function (competition, idx) {
        if (done) {
          return;
        }
        var publicId = "competition-default_cyldui.png";
        if (competition.profile_pic_url) {
          publicId = competition.profile_pic_url;
        }
        var url = $.cloudinary.url(publicId,
                                  { width: 300, height: 230, crop: 'fill'});
        var element;
        if (this.props.listGroup) {
          element = (
            <RB.ListGroupItem>
              <Link to={"competitions/" + competition.id}>
                <img alt={competition.name} src={url} className="competition-focus">
                  <h2>{competition.name}</h2>
                </img>
              </Link>
            </RB.ListGroupItem>
          );
        } else {
          element = (
          <div key={idx} className="col-md-4">
            <Link to={"competitions/" + competition.id}>
              <img alt={competition.name} src={url} className="competition-focus">
                <h2>{competition.name}</h2>
              </img>
            </Link>
          </div>
          );
        }
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
      return (
        <RB.Grid className="competitions container-fullwidth" standalone>
          {finished}
        </RB.Grid>
      );
    }
  });
}(this));
