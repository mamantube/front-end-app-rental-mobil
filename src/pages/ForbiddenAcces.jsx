import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function ForbiddenAccess() {
    const navigateTo = useNavigate()

    function toLanding() {
        localStorage.clear();

        return navigateTo("/")
    }

    return (
        <main className=" d-flex justify-content-center align-items-center min-vh-100">
            <div className=" text-center">
                <img src="/img/forbidden.png" alt="" className=" mb-4"/>
                <h1> 403 | Forbidden Access</h1>
                <p className=" text-h5 mt-5">Maff akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini</p>

                <Button variant="dark" className=" rounded-0 mt-4" onClick={toLanding}>Ke halaman utama</Button>
            </div>
        </main>
    )
}