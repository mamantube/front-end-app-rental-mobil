import { Outlet } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading";


export default function LayoutDefault() {
    const { isLoading } = useLoading();

    let loadingComponent;

    if (isLoading) loadingComponent = <Loading />
    return (
        <>
            <ToastContainer position="top-right" />
                {loadingComponent}

            <div className=" bg-white">
                <Outlet key="layout-default" />
            </div>
        </>
    )
}


// import { Outlet } from "react-router-dom";
// import Loading from "../components/Loading";
// import useLoading from "../hooks/useLoading";
// import { ToastContainer } from "react-toastify"
// import { Container } from "react-bootstrap";

// export default function LayoutDefault () {
//     const { isLoading } = useLoading()

//     let loadingComponent;

//     if ( isLoading ) loadingComponent = <Loading />
//     return (
//         <>
//             <ToastContainer position="top-right" />
//             {loadingComponent}
            
//             <Container>
//                 <Outlet key="layout-default" />
//             </Container>
//         </>

//     )
// }