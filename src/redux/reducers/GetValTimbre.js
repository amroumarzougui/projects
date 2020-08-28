const initialState = {
  valtimbres: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "VALTIMBRE_SELECT":
      return {
        ...state,
        valtimbres: action.payload,
      };
    default:
      return state;
  }
}
