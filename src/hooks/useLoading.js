import { useSelector, useDispatch} from "react-redux";

export default function() {
    const { isLoading } = useSelector((store) =>  store.loading);
    const dispatch = useDispatch();

    function showLoading() {
        dispatch({ type: "SET_LOADING", value: true })
    }

    function hideLoading() {
        dispatch({ type: "SET_LOADING", value: false })
    }
    return {
        isLoading,
        showLoading,
        hideLoading
    }
    
}