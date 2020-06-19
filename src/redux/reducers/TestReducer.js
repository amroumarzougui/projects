const initialState = {
    tests: [
    ]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "TEST_SELECT":
            return {
                ...state,
                tests: action.payload
            }
        default:
            return state;
    };
}

