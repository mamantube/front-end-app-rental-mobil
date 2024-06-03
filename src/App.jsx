import { BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import Beranda from "./pages/Beranda";
import DataMobil from "./pages/admin/data-mobil/Index";
import BuatBaru from "./pages/admin/data-mobil/BuatBaru";
import DataPengguna from "./pages/admin/data-pengguna";
import DataTransaksi from "./pages/admin/data-transaksi";
import Login from "./pages/Login";
import LayoutDefault from "./layouts/Default";
import EditDataMobil from "./pages/admin/data-mobil/EditDataMobil";
import Register from "./pages/customer/Register";
import DashboardCust from "./layouts/DashboardCust";
import BerandaIdx from "./pages/customer/beranda/index";
import DaftarSewa from "./pages/customer/daftar-sewa/DaftarSewa";
import ForbiddenAccess from "./pages/ForbiddenAcces";
import RentalMobil from "./pages/RentalMobil";
import RentalCust from "./pages/customer/rental-mobil/RentalCust";
import DetailProductCust from "./pages/customer/rental-mobil/DetailProductCust";


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
 
        <Route path="customer" Component={DashboardCust}>
          <Route path="beranda" Component={BerandaIdx} />
          <Route path="rental-customer">
            <Route index Component={RentalCust} />
            <Route path="detail-produk/:product_id" Component={DetailProductCust} />
          </Route>
          <Route path="data-transaksi" Component={DaftarSewa} />
        </Route>
        <Route Component={LayoutLanding}>
          <Route index path="/" Component={Beranda} />
          <Route path="data-mobil" Component={RentalMobil} />
        </Route>

        <Route Component={LayoutDefault}>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/Forbidden" Component={ForbiddenAccess} />
          <Route path="/*" element={<h1>Page Not Found :( </h1>} />

        </Route>

      </Routes>
    </BrowserRouter>

  )
}