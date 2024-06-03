const initialState = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    user_id: localStorage.getItem("id") || null,
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
        case "SET_ID": 
            return {
                ...state,
                token: actions.value
            }
        default:
            return state;
    }
};
