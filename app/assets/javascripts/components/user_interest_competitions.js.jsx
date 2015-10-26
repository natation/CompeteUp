(function(root) {
  'use strict';
  root.UserInterestCompetitions = React.createClass({
    getInitialState: function () {
      return {interestCompetitions: []};
    },
    _onChange: function () {
      this.setState({interestCompetitions: CompetitionStore.allInterestCompetitions()});
    },
    componentDidMount: function () {
      CompetitionStore.addInterestCompetitionListener(this._onChange);
      ApiUtil.fetchInterestCompetitions({getInterestCompetitions: this.props.name});
    },
    componentWillUnmount: function () {
      CompetitionStore.removeInterestCompetitionListener(this._onChange);
    },
    render: function () {
      var competitions = "None";
      if (this.state.interestCompetitions.length > 0) {
        competitions = [];
        _.each(this.state.interestCompetitions, function (competition, idx) {
          var publicId = "";
          if (competition.profile_pic_url) {
            publicId = competition.profile_pic_url;
          }
          var url = $.cloudinary.url(publicId,
                                    { width: 50, height: 50, crop: 'fill'});
          competitions.push(
            <div key={idx} className="media">
              <div className="media-left">
                <a href={"#/competitions/" + competition.id}>
                  <img className="media-object" src={url} alt={competition.name}/>
                </a>
              </div>
              <div className="media-body">
                <a href={"#/competitions/" + competition.id}>
                  <h4 className="media-heading">{competition.name}</h4>
                </a>
              </div>
            </div>
          );
        });
      }
      return (
        <ul className="interest-competitions">
          {competitions}
        </ul>
      );
    }
  });
}(this));
