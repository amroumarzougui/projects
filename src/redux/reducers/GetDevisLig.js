const initialState = {
    ligs: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "DEVIS_LIG_SELECT":
            return {
                ...state,
                ligs: action.payload
            }
        default:
            return state;
    };
}

