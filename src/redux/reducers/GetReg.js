const initialState = {
  regs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "REG_SELECT":
      return {
        ...state,
        regs: action.payload,
      };
    default:
      return state;
  }
}
