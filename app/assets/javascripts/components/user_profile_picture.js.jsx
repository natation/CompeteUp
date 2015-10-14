(function(root) {
  'use strict';
  root.UserProfilePicture = React.createClass({
    render: function () {
      return (
        <div className="col-md-6">
          <h3>Profile Pic</h3>
          <img src="https://pgfanfare.files.wordpress.com/2013/02/blank-profile.jpg"
            alt="Profile Pic" height="100px"/>
        </div>
      );
    }
  });
}(this));
