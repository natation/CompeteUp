(function(root) {
  'use strict';
  root.CompetitionSidebar = React.createClass({
    render: function () {
      return (
        <Grid>
          <CompetitionProfilePicture profile_pic_url={this.props.profile_pic_url}/>
          <CompetitionInfo {...this.props}/>
          <CompetitionInterests id={this.props.id}/>
          <CompetitionSuggestions id={this.props.id}/>
        </Grid>
      );
    }
  });
}(this));
