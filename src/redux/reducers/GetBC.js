const initialState = {
    bcs: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "BC_SELECT":
            return {
                ...state,
                bcs: action.payload
            }
        default:
            return state;
    };
}

