import { FileText, Car, User, LogOut  } from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavLink, useNavigate, Navigate } from "react-router-dom";

export default function LayoutDashboard() {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    <Navigate to="/" replace/>

    localStorage.clear();
  }

  if (token && role !== "admin") {
    <Navigate to="/forbidden" />

    localStorage.clear();
  }

  const onLogOut = () => {
    localStorage.clear();

    navigateTo("/")
  }
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle inline"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-gray-700 fixed z-10">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M9 4v16" />
              <path d="M14 10l2 2l-2 2" />
            </svg>
          </label>
          <div className="px-4">MAREMO</div>
        </nav>

        <div className="bg-white pt-24">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-gray-800 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink to="/admin/data-transaksi" className="is-drawer-close:tooltip is-drawer-close:tooltip-right " data-tip="Transaksi">
                <button
                  className=" flex items-center"
                  data-tip="Data Transaksi"
                >
                  {/* Data Transaksi icon */}
                  <FileText className="my-1.5 inline-block size-4" />
                  
                  <span className="is-drawer-close:hidden ms-2">Data Transaksi</span>
                </button>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink to="/admin/data-mobil" className="is-drawer-close:tooltip is-drawer-close:tooltip-right " data-tip="Data Kendaraan">
                <button
                  className=" flex items-center"
                  
                >
                  {/* Data Kendaraan icon */}
                  <Car className="my-1.5 inline-block size-4"/>
                
                  <span className="is-drawer-close:hidden ms-2">Data Kendaraan</span>
                </button>
              </NavLink>
            </li>
            
            {/* List item */}
            <li>
              <NavLink to="/admin/data-customer" className="is-drawer-close:tooltip is-drawer-close:tooltip-right " data-tip="Data Customer">
                <button
                  className=" flex items-center"
                  
                >
                  {/* Data Kendaraan icon */}
                  <User className="my-1.5 inline-block size-4"/>
                
                  <span className="is-drawer-close:hidden ms-2">Data Customer</span>
                </button>
              </NavLink>
            </li>

            {/* List item */}
            <li>
                <button onClick={onLogOut}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Log Out"
                >
                  {/* Data Kendaraan icon */}
                  <LogOut className="my-1.5 inline-block size-4" />
                
                  <span className="is-drawer-close:hidden">Log Out</span>
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}