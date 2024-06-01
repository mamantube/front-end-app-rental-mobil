import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useAxios() {
    const { token } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) config.headers["Authorization"] = `Bearer ${token}`;
            return config;
        }, 
        (error) => {
            return Promise.reject(error)
        });

        axiosInstance.interceptors.response.use(
            (config) => {
                return config;
            },
            (error) => {
                const code = error.response.status;

                if (code === 401) {
                    let {message} = error.response.data;
                    toast.error(message)
                }

                if (code === 403) {
                    let {message} = error.response.data;
                    toast.error(message)

                    localStorage.clear()

                    dispatch({ type: "SET_TOKEN", value: null})
                    dispatch({ type: "SET_ROLE", value: null })

                    window.location.href = "/"
                }
                if (code === 404) {
                    navigateTo("/404")
                }

               

                return Promise.reject(error)
            }
        )

    return axiosInstance;
}