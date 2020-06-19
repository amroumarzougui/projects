const initialState = {
  dbs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_DB":
      return {
        ...state,
        dbs: action.payload,
      };
    default:
      return state;
  }
}
