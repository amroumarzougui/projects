const initialState = {
    bcligs: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "BC_LIG_SELECT":
            return {
                ...state,
                bcligs: action.payload
            }
        default:
            return state;
    };
}

