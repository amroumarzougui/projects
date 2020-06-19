import Axios from "axios";

export const SelectTest = () => {
    return (dispatch) => {
        Axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => { return dispatch({ type: "TEST_SELECT", payload: response.data }) }
            );
    }
}
