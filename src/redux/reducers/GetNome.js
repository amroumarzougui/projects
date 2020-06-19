const initialState = {
  nomes: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case "NOME_SELECT":
      return {
        ...state,
        nomes: action.payload
      };
    default:
      return state;
  }
}
