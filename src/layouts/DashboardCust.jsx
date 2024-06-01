import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { Navbar, Nav, Button, Container,} from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux"

export default function DashboardCust() {
  const [show, setSHow] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch()

  let cssShowMenu = show ? "d-block" : "d-none";

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role")

    dispatch({ type: "SET_TOKEN", value: null });
    dispatch({ type: "SET_ROLE", value: null });

    navigateTo("/");
  }


  function onShowMenu() {
    setSHow(!show);
  }

  const { isLoading } = useLoading();

  let componentLoading;
  if (isLoading) componentLoading = <Loading />;

  const { token, role } = useSelector((store) => store.user);

  
  if (!token) return <Navigate to="/" replace />;

  if (token && role !== "customer") {
    console.log("Forbidden", token, role)
    return <Navigate to="/forbidden" replace />
  }

  return (
    <>
      {componentLoading}

      <Navbar
        variant="light"
        className=" border-bottom border-light shadow-sm py-3"
        // style={{ height: "5rem"}}
        expand="md"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand>
            <h3 className="text-h3">Maremo</h3>
          </Navbar.Brand>

          <Button
            size="sm"
            variant="outline-dark"
            className="d-md-none d-block rounded-0"
            onClick={onShowMenu}
          >
            <i className="bi bi-list"></i>
          </Button>

          <Navbar.Collapse id="navbar--dashboard" className={cssShowMenu}>
            <Nav className="me-auto">
              <NavLink
                to="/customer/beranda"
                className=" ms-md-2 inactive"
                activeclassname="active"
              >
                Beranda
              </NavLink>

              <NavLink
                to="/customer/rental-customer"
                className="mx-md-4 my-md-0 my-2 inactive"
                activeclassname="active"
              >
                Rental Mobil
              </NavLink>

              <NavLink
                to="/customer/data-transaksi"
                className="my-md-0 me-4 my-2 inactive"
                activeclassname="active"
              >
                Daftar Sewa
              </NavLink>

              <NavLink
                to="/customer/profile"
                className=" my-md-0 my-2 inactive"
                activeclassname="active"
              >
                Profil Anda
              </NavLink>
            </Nav>
            <Button
              variant="outline-danger"
              className=" rounded-0 my-md-0 my-2"
              onClick={onLogout}
            >
              Keluar
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className=" my-5">
        <Outlet key="beranda--customer" />
      </Container>

      <Footer />
    </>

    
  );
}
