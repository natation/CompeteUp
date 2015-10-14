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
   render: function () {
       return (
         <div className="container">
           <Navbar/>
           {this.props.children}
         </div>
       );
     }
   });
   var routes = (
     <Route path="/" component={App}>
       <IndexRoute component={Index}/>
       <Route path="profile" components={UserProfile}/>
     </Route>
   );
   React.render(<Router>{routes}</Router>, root);
});
