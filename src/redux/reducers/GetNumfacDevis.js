const initialState = {
    numfac: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "NUMFAC_DEVIS":
            return {
                ...state,
                numfac: action.payload
            }
        default:
            return state;
    };
}

