import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useState } from "react";

export default function LayoutLanding() {
  const [show, setSHow] = useState(false);
  const navigateTo = useNavigate();

  let cssShowMenu = show ? "d-block" : "d-none";

  function onShowMenu() {
    setSHow(!show);
  }

  function onToRegister() {
    navigateTo("/register");
  }

  function onToLogin() {
    navigateTo("/login");
  }

  const { isLoading } = useLoading();

  let componentLoading;
  if (isLoading) componentLoading = <Loading />;
 
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
                to="/"
                className=" ms-md-2 inactive"
                activeclassname="active"
              >
                Beranda
              </NavLink>

              <NavLink
                to="/landing/rental-mobil"
                className="mx-md-4 my-md-0 my-2 inactive"
                activeclassname="active"
              >
                Rental Mobil
              </NavLink>
            </Nav>

            <Button
              variant="outline-primary"
              className=" rounded-0 my-md-0 my-2 mx-3"
              onClick={onToRegister}
            >
              Daftar
            </Button>

            <Button
              variant="dark"
              className=" rounded-0 my-md-0 my-2"
              onClick={onToLogin}
            >
              Masuk
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className=" mt-5">
        <Outlet key="layout-landing" />
      </Container>

      <img
        src="/img/Butuh Bantuan.png"
        alt="contact us"
        className=" d-block mt-5"
        style={{ height: "550px", width: "100%" }}
      />

      <Footer />
    </>
  );
}
