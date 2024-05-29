import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";

export default function LayoutDashboard() {
  const [show, setShow] = useState(false);

  function onShowMenu() {
    setShow(!show);
  }

  let cssShowMenu = show ? "d-block" : "d-none";

  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role")

    dispatch({ type: "SET_TOKEN", value: null });
    dispatch({ type: "SET_ROLE", value: null });

    navigateTo("/");
  }

  const { isLoading } = useLoading();

  let componentLoading;
  if (isLoading) componentLoading = <Loading />;

  const { token, role } = useSelector((store) => store.user);

  if (!token) {
    localStorage.removeItem("role");

    return <Navigate to="/" replace />;
  }
  
  if (token && role !== "admin") return <Navigate to="/forbidden" replace />


  return (
    <>
      <ToastContainer position="top-right" />
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
                to="/admin/data-mobil"
                className=" ms-md-2 inactive"
                activeclassname="active"
              >
                Data Mobil
              </NavLink>
              <NavLink
                to="/admin/data-transaksi"
                className="mx-md-4 my-md-0 my-2 inactive"
                activeclassname="active"
              >
                Transaksi
              </NavLink>
              <NavLink
                to="/admin/data-pengguna"
                className="inactive"
                activeclassname="active"
              >
                Pengguna
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
        <Outlet key="layout-dashboard" />
      </Container>

      <Footer />
    </>
  );
}
