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
    //  getInitialState: function () {
    //    return {competitions: CompetitionStore.all()}
    //  },
     handleSearchClick: function (searchText) {
       ApiUtil.fetchCompetitionMatches(searchText);
     },
     render: function(){
       return (
         <div className="container">
           <Navbar/>
           <SearchBar handleSearchClick={this.handleSearchClick}/>
           <Competition/>
           {this.props.children}
         </div>
       );
     }
   });
   var routes = (
     <Route path="/" component={App}></Route>
   );
   React.render(<Router>{routes}</Router>, root);
});
