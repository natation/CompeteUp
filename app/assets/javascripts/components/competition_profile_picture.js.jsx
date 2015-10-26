(function(root) {
  'use strict';
  root.CompetitionProfilePicture = React.createClass({
    render: function () {
      var publicId = "blank_competition_profile_nrea8m";
      if (this.props.profile_pic_url) {
        publicId = this.props.profile_pic_url;
      }
      var url = $.cloudinary.url(publicId,
                                {width: 250, height: 300, crop: 'fill'});
      return (
        <RB.Row>
          <img src={url} alt="Profile Pic"/>
        </RB.Row>
      );
    }
  });
}(this));
