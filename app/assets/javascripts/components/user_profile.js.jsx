(function(root) {
  'use strict';
  root.UserProfile = React.createClass({
    render: function () {
      return (
        <div className="row">
          <UserInfo/>
          <div className="col-md-1">
            <div className="row">
              <UserProfilePicture/>
            </div>
            <div className="row">
              <UserInterests/>
            </div>
            <div className="row">

            </div>
          </div>
        </div>
      );
    }
  });
}(this));
