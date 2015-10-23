(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    getInitialState: function () {
      return {searchText: "",
              searchByName: true,
              interestsAppear: false};
    },
    _handleKeyPress: function (e) {
      var searchString = e.target.value;
      this.setState({searchText: searchString});
      var searchQuery;
      if (this.state.searchByName) {
        searchQuery = searchString ? {searchTextByName: searchString} : null;
      } else {
        searchQuery = searchString ? {searchTextByInterest: searchString} : null;
      }
      ApiUtil.fetchCompetitionMatches(searchQuery);
    },
    _handleOnChange: function () {
      this.setState({searchText: "", searchByName: !this.state.searchByName});
    },
    _handleClick: function () {
      if (!this.state.searchByName) {
        this.setState({interestsAppear: !this.state.interestsAppear});
      }
    },
    _handleInterestClick: function (name, e) {
      this._handleKeyPress({target: {value: name}});
      this.setState({interestsAppear: false});
    },
    render: function () {
      var glyphShown = "";
      var interestsList = "";
      if (!this.state.searchText) {
        glyphShown = <RB.Glyphicon glyph="search"/>;
      }
      if (this.state.interestsAppear) {
        interestsList = <IndexInterests handleClick={this._handleInterestClick}/>;
      }
      return (
      	<RB.Row md={6}>
          <RB.Col className="search-holder" md={6}>
             <RB.Input
               type="text"
               placeholder="Showing All Competitions"
               onChange={this._handleKeyPress}
               onClick={this._handleClick}
               value={this.state.searchText}
               standalone>
             </RB.Input>
             {glyphShown}
             {interestsList}
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
                  standalone
                  onChange={this._handleOnChange}>
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
