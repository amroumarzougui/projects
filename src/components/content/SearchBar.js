import React, { Component } from "react";
import { searching } from "../../redux/actions/Searching";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import "./CommonComponents.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: false
    };
  }
  toggle = () => {
    this.setState({
      icon: !this.state.icon
    });
  };
  render() {
    return (
      <div className="search-bar">
        <TextField
          placeholder="Recherche..."
          id="input-with-icon-textfield"
          className="input-search"
          onChange={event => this.props.searching(event.target.value)}
          onClick={this.toggle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  searching: event => {
    dispatch(searching(event));
  }
});
const mapStateToProps = state => {
  return {
    searchingResult: state.SearchingReducer
  };
};
const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
export default ConnectedSearchBar;
