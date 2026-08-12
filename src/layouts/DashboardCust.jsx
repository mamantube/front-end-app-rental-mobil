import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserRound, ChevronRight } from "lucide-react";
import { ToastContainer } from "react-toastify"

export default function DashboardCust() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useLoading();
  const { token, role } = useSelector((store) => store.user);
  const [show, setShow] = useState(false);

  if (!token) return <Navigate to="/" replace />;

  if (!token && role !== "customer") return;

  const onLogout = () => {
    localStorage.clear();
    dispatch({ type: "SET_TOKEN", value: null });
    dispatch({ type: "SET_ROLE", value: null });
    dispatch({ type: "SET_USER_ID", value: null });

    navigateTo("/");
  };

  const first_name = localStorage.getItem("first_name");

  return (
    <header>
      <nav className="fixed z-10 w-screen top-0 flex justify-between bg-white py-4 px-16 items-center shadow-lg">
        <div className="flex gap-4 items-center">
          <h1 className="text-gray-800 text-2xl font-bold">
            <NavLink to="/">MAREMO</NavLink>
          </h1>
          <div className="hidden gap-4 text-gray-800 font-medium lg:flex">
            <NavLink
              to="/customer/beranda"
              className="transition ease-in-out duration-200 hover:scale-110 active:font-semibold"
            >
              Beranda
            </NavLink>
            <NavLink
              to="/customer/rental-customer"
              className="transition  ease-in-out duration-200 hover:scale-110 active:font-semibold"
            >
              Rental Mobil
            </NavLink>
          </div>
        </div>
        <div className="dropdown dropdown-end h-full hidden gap-4 text-gray-800 font-semibold lg:flex border-2 rounded-full">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle  avatar text-gray-800 hover:bg-gray-800"
          >
            <div className=" hover:text-white text-gray-800 rounded-full">
              <UserRound />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-white z-1 mt-12 w-52 p-2 shadow-xl border border-gray-200"
          >
            <li className="hover:bg-gray-100">
              <NavLink>Profil</NavLink>
            </li>
            <li className="hover:bg-gray-100">
              <NavLink to="/customer/data-transaksi">Transaksi</NavLink>
            </li>
            <li className="hover:bg-gray-100">
              <NavLink onClick={onLogout}>Log Out</NavLink>
            </li>
          </ul>
        </div>
        {/* <div className="hidden gap-4 text-gray-800 font-medium lg:flex">
          <button
            className="cursor-pointer rounded-lg border border-gray-800 px-4 hover:scale-110 duration-500 transition hover:bg-gray-800 hover:text-white "
            onClick={onLogout}
          >
            User Profile
          </button>
        </div> */}

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
        className={`fixed z-10 top-16 overflow-hidden shadow-lg text-gray-800 bg-white w-screen border-1.5 transition-all duration-300 lg:hidden ${show ? "block" : "hidden"}`}
      >
        <div className="flex flex-col gap-2 py-4 px-6">
          <ul className="$$menu $$menu-vertical leading-8">
            <li>
                <NavLink to="/">
                    Beranda
                </NavLink>
            </li>
            <li>
                <NavLink>
                    Rental Mobil
                </NavLink>
            </li>
            <li>
                <details>
                    <summary className="flex text-base gap-2 items-center"> <UserRound /> { first_name } </summary>
                    <ul className="mt-4">
                        <li className="flex items-baseline"> <ChevronRight size={15} strokeWidth={1.5} absoluteStrokeWidth />Profile</li>
                        <li className="flex items-baseline">
                          <NavLink to="/customer/daftar-sewa">
                            <ChevronRight size={15} strokeWidth={1.5} />Transaksi
                            </NavLink> 
                        </li>
                        <li className="flex items-baseline"> <ChevronRight size={15} strokeWidth={1.5} /> Log Out</li>
                    </ul>
                </details>
            </li>
        </ul>
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
        <ToastContainer position="top-right" />

      <div className=" mt-16 bg-[#ffffff]">
        <Outlet key="layout-landing" />
      </div>

      <Footer />
    </header>
  );
}

// import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
// import useLoading from "../hooks/useLoading";
// import Loading from "../components/Loading";
// import Footer from "../components/Footer";
// import { Navbar, Nav, Button, Container,} from "react-bootstrap";
// import { useState } from "react";
// import { useSelector, useDispatch} from "react-redux"

// export default function DashboardCust() {
//   const [show, setSHow] = useState(false);
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch()

//   let cssShowMenu = show ? "d-block" : "d-none";

//   function onLogout() {
//     localStorage.clear()

//     dispatch({ type: "SET_TOKEN", value: null });
//     dispatch({ type: "SET_ROLE", value: null });
//     dispatch({ type: "SET_USER_ID", value: null })

//     navigateTo("/");
//   }

//   function onShowMenu() {
//     setSHow(!show);
//   }

//   const { isLoading } = useLoading();

//   let componentLoading;
//   if (isLoading) componentLoading = <Loading />;

//   const { token, role, } = useSelector((store) => store.user);

//   if (!token) return <Navigate to="/" replace />;

//   if (token && role !== "customer") {
//     console.log("Forbidden", token, role)
//     return <Navigate to="/forbidden" replace />
//   }

//   return (
//     <>
//       {componentLoading}

//       <Navbar
//         variant="light"
//         className=" border-bottom border-light shadow-sm py-3"
//         // style={{ height: "5rem"}}
//         expand="md"
//         collapseOnSelect
//       >
//         <Container>
//           <Navbar.Brand>
//             <h3 className="text-h3">Maremo</h3>
//           </Navbar.Brand>

//           <Button
//             size="sm"
//             variant="outline-dark"
//             className="d-md-none d-block rounded-0"
//             onClick={onShowMenu}
//           >
//             <i className="bi bi-list"></i>
//           </Button>

//           <Navbar.Collapse id="navbar--dashboard" className={cssShowMenu}>
//             <Nav className="me-auto">
//               <NavLink
//                 to="/customer/beranda"
//                 className=" ms-md-2 inactive"
//                 activeclassname="active"
//               >
//                 Beranda
//               </NavLink>

//               <NavLink
//                 to="/customer/rental-customer"
//                 className="mx-md-4 my-md-0 my-2 inactive"
//                 activeclassname="active"
//               >
//                 Rental Mobil
//               </NavLink>

//               <NavLink
//                 to="/customer/data-transaksi"
//                 className="my-md-0 me-4 my-2 inactive"
//                 activeclassname="active"
//               >
//                 Daftar Sewa
//               </NavLink>

//               <NavLink
//                 to="/customer/profile-anda"
//                 className=" my-md-0 my-2 inactive"
//                 activeclassname="active"
//               >
//                 Profil Anda
//               </NavLink>
//             </Nav>
//             <Button
//               variant="outline-danger"
//               className=" rounded-0 my-md-0 my-2"
//               onClick={onLogout}
//             >
//               Keluar
//             </Button>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Container className=" my-5">
//         <Outlet key="beranda--customer" />
//       </Container>

//       <Footer />
//     </>

//   );
// }
