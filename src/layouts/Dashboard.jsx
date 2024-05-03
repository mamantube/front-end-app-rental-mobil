import { Outlet, NavLink, Navigate } from "react-router-dom";
import { Navbar, Container, Button, Nav} from "react-bootstrap";
import { useState} from "react"
import { useSelector } from "react-redux"

export default function LayoutDashboard () {
    const [show, setShow] = useState(false);

    function onShowMenu() {
        setShow(!show)
    }

    let cssShowMenu  = show ? "d-block" : "d-none";

    const { token } = useSelector((store) => store.user)
    if (!token) return <Navigate to="/admin/login" replace />
    

    return (
        <>
            <Navbar variant="light" className=" border-bottom border-light shadow-sm py-3" 
            // style={{ height: "5rem"}} 
            expand="md" collapseOnSelect >
                <Container>
                    <Navbar.Brand>
                        <h3 className="text-h3">Maremo</h3>
                    </Navbar.Brand>

                    <Button size="sm" variant="outline-dark" className="d-md-none d-block rounded-0" onClick={onShowMenu}>
                        <i className="bi bi-list"></i>
                    </Button>

                    <Navbar.Collapse id="navbar--dashboard" className={cssShowMenu}>
                        <Nav className="me-auto">
                            <NavLink to="/admin/data-mobil" className=" ms-md-2 inactive" activeclassname="active" >
                                Data Mobil
                            </NavLink>
                            <NavLink to="/admin/data-transaksi" className="mx-md-4 my-md-0 my-2 inactive" activeclassname="active" >
                                Transaksi
                            </NavLink>
                            <NavLink to="/admin/data-pengguna" className="inactive" activeclassname="active" >
                                Pengguna
                            </NavLink>
                        </Nav>
                        <Button variant="outline-danger" className=" rounded-0 my-md-0 my-2">Keluar</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Outlet key="layout-dashboard" />
        </>

    )
}