(function(root) {
  'use strict';
  root.CompetitionSidebar = React.createClass({
    render: function () {
      return (
        <RB.Col md={12}>
          <CompetitionProfilePicture profile_pic_url={this.props.profile_pic_url}
                                     setProfileColors={this.props.setProfileColors}/>
          <CompetitionInfo {...this.props}/>
          <CompetitionInterests id={this.props.id}/>
          <CompetitionSuggestions id={this.props.id}/>
        </RB.Col>
      );
    }
  });
}(this));
