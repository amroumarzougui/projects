import Axios from "axios";

export const SelectBC = () => {
    return (dispatch) => {
        Axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => { return dispatch({ type: "BC_SELECT", payload: response.data }) }
            );
    }
}