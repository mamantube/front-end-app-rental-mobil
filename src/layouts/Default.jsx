import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import useLoading from "../hooks/useLoading";

export default function LayoutDefault () {
    const { isLoading } = useLoading()

    let loadingComponent;

    if ( isLoading ) loadingComponent = <Loading />
    return (
        <>
            {loadingComponent}

            <Outlet key="layout-default" />
        </>

    )
}