import Axios from "axios";

export const SelectArticle = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/ARTICLEs")
      // Axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        return dispatch({ type: "ARTICLE_SELECT", payload: response.data });
      });
  };
};
