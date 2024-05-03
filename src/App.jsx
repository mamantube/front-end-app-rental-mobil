import { BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import Home from "./pages/Home";
import DataMobil from "./pages/admin/data-mobil/Index";
import DataPengguna from "./pages/admin/data-pengguna";
import DataTransaksi from "./pages/admin/data-transaksi";
import Adminlogin from "./pages/admin/Login";
import LayoutDefault from "./layouts/Default";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={LayoutDashboard}>
          <Route index path="/admin/data-mobil" Component={DataMobil} />
          <Route index path="/admin/data-pengguna" Component={DataPengguna} />
          <Route index path="/admin/data-transaksi" Component={DataTransaksi} />
        </Route>

        <Route Component={LayoutLanding}>
          <Route index path="/" Component={Home} />
        </Route>

        <Route Component={LayoutDefault}>
          <Route path="/admin/login" Component={Adminlogin} />
          <Route path="/*" element={<h1>Page Not Found :( </h1>} />

        </Route>

      </Routes>
    </BrowserRouter>

  )
}