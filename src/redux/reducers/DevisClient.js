const initialState = {
    devis: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "USER_SELECTED":
            return {
                ...state,
                devis: action.payload
            }
        default:
            return state;
    };
}

