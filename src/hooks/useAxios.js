import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

export default function useAxios() {
    const { token } = useSelector((store) => store.user);
    const dispatch = useDispatch();

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
                
                // if (code === 400) {
                //     let {message} = error.response.data;
                //     toast.error(message)
                // }

                // if (code === 401) {
                //     let {message} = error.response.data;
                //     toast.error(message)
                // }

                if (code === 403) {
                    let {message} = error.response.data;
                    toast.error(message)

                    localStorage.removeItem("token")

                    dispatch({ type: "SET_TOKEN", value: null})

                    window.location.href = "/admin/login"
                } else if ( code >= 400 && code < 500) {
                    let { message, data} = error.response.data;

                    if (data) {
                        for( let resError of data.errors) {
                            toast.error(resError.message)
                        }
                        return
                    }
                    toast.error(message)
                }

                return Promise.reject(error)
            }
        )

    return axiosInstance;
}