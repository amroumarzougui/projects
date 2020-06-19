const initialState = {
  sousfamilles: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case "SOUS_FAMILLE_SELECT":
      return {
        ...state,
        sousfamilles: action.payload
      };
    default:
      return state;
  }
}
