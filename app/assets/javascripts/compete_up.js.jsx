$(function() {
  'use strict';
  var root = document.getElementById('mainContent');
  if (!root) {
    return;
  }
   var Route = ReactRouter.Route;
   var Router = ReactRouter.Router;
   var IndexRoute = ReactRouter.IndexRoute;

   var App = React.createClass({
   render: function(){
       return this.props.children;
     }
   });
   var routes = (
     <Route path="/" component={App}>
       <IndexRoute component={Index}/>
     </Route>
   );
   React.render(<Router>{routes}</Router>, root);
});
