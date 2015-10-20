(function(root) {
  'use strict';
  root.CompetitionProfilePicture = React.createClass({
    render: function () {
      var publicId = "competition-default_cyldui";
      if (this.props.profile_pic_url) {
        publicId = this.props.profile_pic_url;
      }
      var url = $.cloudinary.url(publicId,
                                { width: 100, height: 150, crop: 'fill',
                                  radius: 20});
      return (
        <RB.Row>
          <img src={url} alt="Profile Pic"/>
        </RB.Row>
      );
    }
  });
}(this));
