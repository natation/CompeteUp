(function(root) {
  'use strict';
  root.UserProfile = React.createClass({
    render: function () {
      return (
        <RB.Grid>
          <div className="row">
            <UserInfo/>
            <div className="col-md-5">
              <div className="row">
                <UserProfilePicture/>
              </div>
              <div className="row">
                <UserInterests/>
              </div>
            </div>
          </div>
        </RB.Grid>
      );
    }
  });
}(this));
