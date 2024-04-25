import { combineReducers, legacy_createStore as createStore } from "redux";
import { reducerCounter} from "./reducers/counter.js";
import { reducerLoading } from "./reducers/loading.js";
import { reducerUser } from "./reducers/user.js";

let store = combineReducers({
    counter: reducerCounter,
    loading: reducerLoading,
    user: reducerUser,
});

export default createStore(store)