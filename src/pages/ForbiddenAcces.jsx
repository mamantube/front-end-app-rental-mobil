// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ForbiddenAccess() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  function toLanding() {
    localStorage.clear();

    dispatch({ type: "SET_TOKEN", value: null });
    dispatch({ type: "SET_ROLE", value: null });
    dispatch({ type: "SET_USER_ID", value: null })
    return navigateTo("/");
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className=" text-center">
        <img src="/img/forbidden.png" alt="" className=" mb-4" />
        <h1> 403 | Forbidden Access</h1>
        <p className=" text-h5 mt-5">
          Maff akses ditolak. Anda tidak memiliki izin untuk mengakses halaman
          ini
        </p>

        <button className=" rounded-0 mt-4" onClick={toLanding}>
          Ke halaman utama
        </button>
      </div>
    </main>
  );
}
