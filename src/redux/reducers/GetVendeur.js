const initialState = {
  vendeurs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "VD_SELECT":
      return {
        ...state,
        vendeurs: action.payload,
      };
    default:
      return state;
  }
}
