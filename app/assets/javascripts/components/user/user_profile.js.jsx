(function(root) {
  'use strict';
  root.UserProfile = React.createClass({
    render: function () {
      return (
        <RB.Grid className="user-profile">
          <RB.Row>
            <UserInfo/>
            <RB.Col md={5} className="user-profile-pic-interests">
              <RB.Row>
                <UserProfilePicture/>
              </RB.Row>
              <RB.Row>
                <UserInterests/>
              </RB.Row>
            </RB.Col>
          </RB.Row>
        </RB.Grid>
      );
    }
  });
}(this));
