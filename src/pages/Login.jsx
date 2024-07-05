import FormAuth from "../components/FormAuth";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLoading from "../hooks/useLoading";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, NavLink} from "react-router-dom";
import useAxios from "../hooks/useAxios";

export default function Login() {
  const schema = Yup.object({
    email: Yup.string()
      .required("Email harus diisi")
      .email("Format email salah"),
    password: Yup.string()
      .required("Password harus diisi")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Minimal 6 karakter, satu huruf besar dan satu angka"
      ),
  });

  const initialForm = {
    email: "",
    password: "",
  };

  const { showLoading, hideLoading } = useLoading();

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const axios = useAxios();

  function onSubmitForm(values) {
    showLoading();
    axios
      .post("api/v1/user/login", values)
      .then((response) => {
        let { token, role_user, user_id } = response.data.data;

        localStorage.setItem("role", role_user);
        localStorage.setItem("token", token);
        localStorage.setItem("id", user_id);

        dispatch({ type: "SET_TOKEN", value: token });
        dispatch({ type: "SET_ROLE", value: role_user });
        dispatch({ type: "SET_USER_ID", value: user_id });
        // console.log("INI", response.data.data);
        toast.success("Login Berhasil");
        navigateTo(role_user === "admin" ? "/admin/data-mobil" : "/customer/beranda");
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: onSubmitForm,
  });

  const { token, role, id } = useSelector((store) => store.user);
  // const { role } = useSelector((store) => store.user);

  if (token && id) {
    if (role === "admin") return <Navigate to="/admin/data-mobil" replace />;

    else if (role === "customer") return <Navigate to="/customer/beranda" replace />;
  }

  return (
    <main
      id="container__login__admin"
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <FormAuth
        title="Login"
        subTitle="Masukkan Email dan Password"
      >
        <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className=" border-secondary"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className=" border-secondary"
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="dark" type="submit" className=" w-100">
            Masuk
          </Button>
          <span className=" d-flex">
            <p className=" mt-3">Belum mempunyai akun? Silahkan daftar <NavLink className=" text-primary" to="/register" >Di sini</NavLink>  </p>
          </span>
        </Form>
      </FormAuth>
    </main>
  );
}
