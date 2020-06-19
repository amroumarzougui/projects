import React, {Component} from "react";
import { TestAction } from "../redux/actions/TestAction";
import {connect } from "react-redux";
import { Button } from "reactstrap";

const Test = (props) => {
    console.log(props.name);
    return(
        <div>
            <h1> Namesss=
                {props.name}
            </h1>
            <Button onClick={props.TestAction()}>change</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        name: state.name
    }
}
const mapDispatchToProps = dispatch => {
    return {
        TestAction: () =>dispatch(TestAction())
    }
}



export default  connect(mapStateToProps, mapDispatchToProps)(Test);
