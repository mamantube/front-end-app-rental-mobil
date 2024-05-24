import { BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import Home from "./pages/Home";
import DataMobil from "./pages/admin/data-mobil/Index";
import BuatBaru from "./pages/admin/data-mobil/BuatBaru";
import DataPengguna from "./pages/admin/data-pengguna";
import DataTransaksi from "./pages/admin/data-transaksi";
import Adminlogin from "./pages/admin/Login";
import LayoutDefault from "./layouts/Default";
import EditDataMobil from "./pages/admin/data-mobil/EditDataMobil";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="admin" Component={LayoutDashboard}>
          <Route path="data-mobil">
            <Route index Component={DataMobil} />
            <Route path="buat-baru" Component={BuatBaru} />
            <Route path="edit/:product_id" Component={EditDataMobil} />
          </Route>

          <Route path="data-pengguna" Component={DataPengguna} />
          <Route path="data-transaksi" Component={DataTransaksi} />
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