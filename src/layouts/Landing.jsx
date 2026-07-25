import {
  Outlet,
  NavLink,
  // useNavigate
} from "react-router-dom";
// import useLoading from "../hooks/useLoading";
// import { Navbar, Button, Nav, Container } from "react-bootstrap";
import Footer from "../components/Footer";
// import Loading from "../components/Loading";
import { useState } from "react";

export default function LayoutLanding() {
  const [show, setShow] = useState(false);
  // const navigateTo = useNavigate();

  // let cssShowMenu = show ? "d-block" : "d-none";

  // function onShowMenu() {
  //   setSHow(!show);
  // }

  // function onToRegister() {
  //   navigateTo("/register");
  // }

  // function onToLogin() {
  //   navigateTo("/login");
  // }

  // const { isLoading } = useLoading();

  // let componentLoading;
  // if (isLoading) componentLoading = <Loading />;

  return (
    <header>
      <nav className="flex justify-between bg-gray-700 py-4 px-4">
        <div>
          <h1 className="text-white text-2xl font-bold">
            <NavLink to="/">MAREMO</NavLink>
          </h1>
        </div>

        <div className="hidden gap-4 text-white font-medium lg:flex">
          <NavLink>Beranda</NavLink>
          <NavLink>Rental Mobil</NavLink>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="rounded-full px-3 py-1.5 transition-colors duration-500 hover:bg-neutrals-50/10 md:px-4 md:py-2"
            aria-haspopup="dialog"
            aria-expanded={show}
            aria-controls="mobile-menu"
            onClick={() => setShow((value) => !value)}
          >
            <span className="relative block size-5">
              <span
                className={[
                  "absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-150",
                  show ? "top-2.5 rotate-45" : "top-1",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-150",
                  show ? "top-2.5 -rotate-45" : "top-3",
                ].join(" ")}
              />
            </span>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>

      </nav>
        <div id="mobile-menu" className={`overflow-hidden bg-gray-700 transition-all duration-300 lg:hidden ${show ? "block" : "hidden"}`}>
          <div className="flex flex-col gap-2 p-4">
            <NavLink>Beranda</NavLink>
            <NavLink>Rental Mobil</NavLink>
          </div>
        </div>

      {/* {componentLoading} */}
      {/* <nav
        className=" border-bottom border-light shadow-sm py-3"
        // style={{ height: "5rem"}}
      >
        <div>
          <div>
            <h3 className="text-h3">Maremo</h3>
          </div>

          <button
            size="sm"
            className="d-md-none d-block rounded-0"
            onClick={onShowMenu}
          >
            <i className="bi bi-list"></i>
          </button>

          <div id="navbar--dashboard" className={cssShowMenu}>
            <div className="me-auto">
              <NavLink
                to="/"
                className=" ms-md-2 inactive"
                activeclassname="active"
              >
                Beranda
              </NavLink>

              <NavLink
                to="/data-mobil"
                className="mx-md-4 my-md-0 my-2 inactive"
                activeclassname="active"
              >
                Rental Mobil
              </NavLink>
            </div>

            <button
              className=" rounded-0 my-md-0 my-2 mx-3"
              onClick={onToRegister}
            >
              Daftar
            </button>

            <button
              className=" rounded-0 my-md-0 my-2"
              onClick={onToLogin}
            >
              Masuk
            </button>
          </div>
        </div>
      </nav> */}

      <div className=" mt-5">
        <Outlet key="layout-landing" />
      </div>

      <Footer />
    </header>
  );
}
