(function(root) {
  'use strict';
  root.CompetitionMember = React.createClass({
    render: function () {
      var url,
          image = <div></div>;
      var publicId = this.props.profile_pic_url;
      if (publicId) {
        url = $.cloudinary.url(publicId, {width: 50, height: 50, crop: 'fill'});
        image = <img src={url} alt="Profile Pic"/>;
      }
      return (
        <RB.OverlayTrigger
          className="members"
          trigger="click" rootClose placement="top"
          overlay={
            <RB.Popover title="User Info" id="popover">
              {this.props.bio}
              {image}
            </RB.Popover>}>
            <RB.Button
              bsStyle="warning"
              bsSize="large">
              {this.props.name}
            </RB.Button>
        </RB.OverlayTrigger>
      );
    }
  });
}(this));
