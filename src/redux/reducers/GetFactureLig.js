const initialState = {
    fligs: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "F_LIG_SELECT":
            return {
                ...state,
                fligs: action.payload
            }
        default:
            return state;
    };
}

