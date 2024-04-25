import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import useLoading from "../hooks/useLoading";
import { ToastContainer } from "react-toastify"

export default function LayoutDefault () {
    const { isLoading } = useLoading()

    let loadingComponent;

    if ( isLoading ) loadingComponent = <Loading />
    return (
        <>
            <ToastContainer position="top-right" />
            {loadingComponent}

            <Outlet key="layout-default" />
        </>

    )
}