const initialState = {
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default authReducer;
