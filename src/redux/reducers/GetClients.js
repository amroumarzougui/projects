const initialState = {
    clients: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "CLIENT_SELECT":
            return {
                ...state,
                clients: action.payload
            }
        default:
            return state;
    };
}

