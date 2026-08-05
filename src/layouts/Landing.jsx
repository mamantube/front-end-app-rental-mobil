import {
  Outlet,
  NavLink,
  useNavigate
} from "react-router-dom";
// import useLoading from "../hooks/useLoading";
// import { Navbar, Button, Nav, Container } from "react-bootstrap";
import Footer from "../components/Footer";
// import Loading from "../components/Loading";
import { useState } from "react";

export default function LayoutLanding() {
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  // let cssShowMenu = show ? "d-block" : "d-none";

  // function onShowMenu() {
  //   setSHow(!show);
  // }

  // function onToRegister() {
  //   navigateTo("/register");
  // }

  function onToLogin() {
    navigateTo("/login");
  }

  // const { isLoading } = useLoading();

  // let componentLoading;
  // if (isLoading) componentLoading = <Loading />;

  return (
    <header>
      <nav className="fixed z-10 w-screen top-0 flex justify-between bg-white py-4 px-16 items-center shadow-lg">
        <div className="flex gap-4 items-center">
          <h1 className="text-gray-800 text-2xl font-bold">
            <NavLink to="/">MAREMO</NavLink>
          </h1>
          <div className="hidden gap-4 text-gray-800 font-medium lg:flex">
            <NavLink to="/" className="transition ease-in-out duration-200 hover:scale-110 active:font-semibold">Beranda</NavLink>
            <NavLink to="/data-mobil" className="transition  ease-in-out duration-200 hover:scale-110 active:font-semibold">Rental Mobil</NavLink>
          </div>
        </div>

        <div className="hidden gap-4 text-gray-800 font-medium lg:flex">
          <button className="cursor-pointer rounded-lg border border-gray-800 px-4 hover:scale-110 duration-500 transition hover:bg-gray-800 hover:text-white " onClick={onToLogin} >
            Book Now
          </button>
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
                  "absolute left-0 block h-[1.5px] w-4 bg-gray-800 transition-all duration-150",
                  show ? "top-2.5 rotate-45" : "top-1",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 block h-[1.5px] w-4 bg-gray-800 transition-all duration-150",
                  show ? "top-2.5 -rotate-45" : "top-3",
                ].join(" ")}
              />
            </span>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </nav>
        <div
          id="mobile-menu"
          className={`fixed z-10 top-16 overflow-hidden shadow-lg bg-white w-screen border-1.5 transition-all duration-300 lg:hidden ${show ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-2 py-4 px-6">
            <NavLink to="/" className="">Beranda</NavLink>
            <NavLink to="/data-mobil" className="">Rental Mobil</NavLink>
            <button className="items-center cursor-pointer rounded-lg border w-28 bg-gray-800 text-white border-gray-800 hover:scale-110 duration-500 transition hover:bg-gray-800 hover:text-white " onClick={onToLogin} >
              Book Now
            </button>
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

      <div className=" mt-16 bg-[#ffffff]">
        <Outlet key="layout-landing" />
      </div>

      <Footer />
    </header>
  );
}
