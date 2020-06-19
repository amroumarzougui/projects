const initialState = {
  fournisseurs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "FOURNISSEUR_SELECT":
      return {
        ...state,
        fournisseurs: action.payload,
      };
    default:
      return state;
  }
}
