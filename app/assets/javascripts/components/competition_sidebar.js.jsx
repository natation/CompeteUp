(function(root) {
  'use strict';
  root.CompetitionSidebar = React.createClass({
    render: function () {
      return (
        <Grid>
          <CompetitionProfilePicture profile_pic_url={this.props.profile_pic_url}/>
          <CompetitionInfo {...this.props}/>
          <CompetitionInterests id={this.props.id}/>
          <CompetitionSuggestions/>
        </Grid>
      );
    }
  });
}(this));
// <CompetitionInfo location={this.props.location} established={this.props.established}/>
