const initialState = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    user_id: localStorage.getItem("user_id") || null,
};

export const reducerUser = ( state = initialState, actions) => {
    switch (actions.type) {
        case "SET_TOKEN":
            return {
                ...state,
                token: actions.value,
            };  
        case "SET_ROLE":
            return {
                ...state,
                role: actions.value
            };
        case "SET_USER_ID": 
            return {
                ...state,
                user_id: actions.value
            }
        default:
            return state;
    }
};
