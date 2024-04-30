import { BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutDashboard from "./layouts/Dashboard";
import LayoutLanding from "./layouts/Landing";
import Home from "./pages/Home";
import DataMobil from "./pages/admin/data-mobil/Index";
import Adminlogin from "./pages/admin/Login";
import LayoutDefault from "./layouts/Default";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={LayoutDashboard}>
          <Route index path="/admin/data-mobil" Component={DataMobil} />
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