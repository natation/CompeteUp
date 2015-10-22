(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    getInitialState: function () {
      return {searchText: "",
              searchGlyphShow: true};
    },
    handleKeyPress: function (e) {
      var searchString = e.target.value;
      if (searchString) {
        this.setState({searchGlyphShow: false});
      } else {
        this.setState({searchGlyphShow: true});
      }
      var searchQuery = searchString ? {searchText: searchString} : null;
      ApiUtil.fetchCompetitionMatches(searchQuery);
    },
    handleBarClick: function () {
      ApiUtil.fetchAllInterests();
    },
    render: function () {
      var glyphShown = "";
      if (this.state.searchGlyphShow) {
        glyphShown = <RB.Glyphicon glyph="search"/>;
      }
      return (
      	<RB.Row md={6}>
          <RB.Col className="search-holder" md={6}>
             <RB.Input
               type="text"
               placeholder="All Competitions"
               onChange={this.handleKeyPress}
               standalone>
             </RB.Input>
             {glyphShown}
          </RB.Col>
          <RB.Col md={6}>
            <RB.Row className="search-holder">
              <RB.Col md={4} mdOffset={2}>
                <h6>Search by:</h6>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Input
                  type="select"
                  placeholder="name"
                  standalone>
                    <option value="name">Name</option>
                    <option value="interest">Interest</option>
                </RB.Input>
              </RB.Col>
            </RB.Row>
          </RB.Col>
      	</RB.Row>
      );
    }
  });
}(this));
