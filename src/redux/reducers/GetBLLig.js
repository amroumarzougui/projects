const initialState = {
    blligs: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "BL_LIG_SELECT":
            return {
                ...state,
                blligs: action.payload
            }
        default:
            return state;
    };
}

