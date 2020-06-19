import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./CommonComponents.scss";
const Loader = WrappedComponent => {
  return class Loader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isLoading: this.props.isLoading
      };
    }
    componentDidUpdate(prevProps, prevState) {}

    render() {
      return this.props.isLoading ? (
        <div className="loader">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>{" "}
        </div>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    isLoading: state.loaderReducer
  };
};
const ComposedLoader = compose(connect(mapStateToProps), Loader);
export default ComposedLoader;
