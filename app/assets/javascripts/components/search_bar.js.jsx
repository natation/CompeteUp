(function(root) {
  'use strict';
  root.SearchBar = React.createClass({
    getInitialState: function () {
      return {searchText: "",
              searchByName: true,
              interestsAppear: false};
    },
    _handleKeyPress: function (e, interestsClosing) {
      var searchString = e.target.value;
      this.setState({searchText: searchString});
      var searchQuery;
      if (this.state.searchByName) {
        searchQuery = searchString ? {searchByName: searchString} : null;
      } else {
        searchQuery = searchString ? {searchByInterest: searchString} : null;
      }
      if (this.state.searchByName) {
        ApiUtil.fetchCompetitionMatches(searchQuery);
      } else if (interestsClosing) {
        ApiUtil.fetchCompetitionMatches(searchQuery);
        this.setState({searchText: ""});
      } else {
        ApiUtil.fetchAllInterests({searchByName: searchString});
      }
    },
    _handleOnChange: function () {
      this.setState({searchText: "",
                     searchByName: !this.state.searchByName});
      if (this.state.interestsAppear) {
        this.setState({interestsAppear: false});
      }
      this._handleKeyPress({target: {value: ""}}, true);
    },
    _handleClick: function () {
      if (!this.state.searchByName) {
        this.setState({interestsAppear: !this.state.interestsAppear});
      }
    },
    _handleInterestClick: function (name, e) {
      this._handleKeyPress({target: {value: name}}, true);
      this.setState({interestsAppear: false});
    },
    render: function () {
      var glyphShown = "";
      var interestsList = "";
      var placeholder = "Showing All Competitions";
      if (!this.state.searchText) {
        glyphShown = <RB.Glyphicon glyph="search"/>;
      }
      if (this.state.interestsAppear) {
        interestsList = <IndexInterests handleClick={this._handleInterestClick}/>;
        placeholder = "Showing All Interests";
      }
      return (
      	<RB.Row md={6}>
          <RB.Col className="search-holder" md={6}>
             <RB.Input
               type="text"
               placeholder={placeholder}
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
