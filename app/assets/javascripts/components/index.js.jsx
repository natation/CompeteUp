(function(root) {
  'use strict';
  root.Index = React.createClass({
    render: function () {
      return (
        <div className="container">
          <SearchBar/>
          <Competition/>
          <Interest/>
        </div>
      );
    }
  });
}(this));
