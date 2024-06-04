import { Button, Form } from "react-bootstrap";
import FormAuth from "../../components/FormAuth";
import * as Yup from "yup";
import useAxios from "../../hooks/useAxios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";

export default function Register() {
  const schema = Yup.object({
    first_name: Yup.string()
      .required("Nama depan tidak boleh kosong")
      .min(1, "Nama depan tidak boleh kosong")
      .trim(),
    last_name: Yup.string().trim(),
    phone: Yup.string()
      .required("Nomor hanphone tidak boleh kosong")
      .min(1, "Nomor hanphone tidak boleh kosong")
      .matches(
        /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
        "Nomor hanphone tidak valid"
      ),
    email: Yup.string()
      .required("Email tidak boleh kosong")
      .email("Email tidak valid"),
    password: Yup.string()
      .required("Password tidak boleh kosong")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Minimal 6 karakter, satu huruf besar dan satu angka"
      ),
  });

  const initialForm = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  };

  const axios = useAxios();
  const navigateTo = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  function toLogin() {
    navigateTo("/login");
  }

  function onSubmitForm(values) {
    showLoading();
    axios
      .post("/api/v1/user/register", values)
      .then((response) => {
        navigateTo("/login");
        console.log("coba", response.data.data);
        toast.success("Daftar berhasil, silahkan masuk");
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
  return (
    <main
      id="register--form"
      className=" d-flex justify-content-center align-items-center min-vh-100"
    >
      <FormAuth title="Buat Akun" subTitle="Selamat datang!">
        <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className=" mb-3">
            <Form.Control
              type="text"
              placeholder="Nama depan"
              name="first_name"
              value={Formik.values.first_name}
              onChange={Formik.handleChange}
              className=" border-secondary"
              isInvalid={!!Formik.errors.first_name}
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" mb-3">
            <Form.Control
              type="text"
              placeholder="Nama belakang"
              name="last_name"
              value={Formik.values.last_name}
              onChange={Formik.handleChange}
              className=" border-secondary"
            />
          </Form.Group>

          <Form.Group className=" mb-3">
            <Form.Control
              type="string"
              placeholder="Nomor hanphone"
              name="phone"
              value={Formik.values.phone}
              onChange={Formik.handleChange}
              className=" border-secondary"
              isInvalid={!!Formik.errors.phone}
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              className=" border-secondary"
              isInvalid={!!Formik.errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              className=" border-secondary"
              isInvalid={!!Formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="dark" type="submit" className=" w-100">
            Daftar
          </Button>

          <span className=" d-flex">
            <p className=" mt-3">Sudah mempunyai akun? Silahkan masuk </p>
            <Button variant="link" size="sm" onClick={toLogin}>
              Di sini
            </Button>
          </span>
        </Form>
      </FormAuth>
    </main>
  );
}
