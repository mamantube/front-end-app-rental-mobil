import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";

export default function layoutDefault () {
    return (
        <>
            <Loading />


            <Outlet key="layout-default" />
        </>

    )
}