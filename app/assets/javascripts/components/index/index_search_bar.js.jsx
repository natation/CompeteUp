(function(root) {
  'use strict';
  root.IndexSearchBar = React.createClass({
    getInitialState: function () {
      if (this.props.interest) {
        setTimeout(function () {
          this._handleKeyPress({target: {value: this.props.interest}}, true);
        }.bind(this), 0);
      }
      return {searchText: "",
              searchByName: true && !this.props.interest,
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
        this.setState({interestsAppear: true});
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
    _handleInterestClick: function (name, e) {
      this._handleKeyPress({target: {value: name}}, true);
      this.setState({interestsAppear: false});
    },
    scrollToSearchBar: function () {
      setTimeout(function () {
        if (window.location.hash.match(/#\/find/)) {
          var searchBarOffsetTop =
                $('.search-bar').offset().top - $('.navbar').outerHeight();
          $('body').animate({scrollTop: searchBarOffsetTop}, 'slow');
        }
      }.bind(this), 0);
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
               value={this.state.searchText}
               onClick={this.scrollToSearchBar}
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
                  value={this.state.searchByName ? "name": "interest"}
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
