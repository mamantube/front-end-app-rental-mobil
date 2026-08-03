import FormAuth from "../../components/FormAuth";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

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
        "Nomor hanphone tidak valid",
      ),
    email: Yup.string()
      .required("Email tidak boleh kosong")
      .email("Email tidak valid"),
    password: Yup.string()
      .required("Password tidak boleh kosong")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Minimal 6 karakter, satu huruf besar dan satu angka",
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

  function onSubmitForm(values) {
    showLoading();
    axios
      .post("/api/v1/user/register", values)
      .then(() => {
        navigateTo("/login");
        // console.log("coba", response.data.data);
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

  function toBeranda() {
    navigateTo("/");
  }

  return (
    <section className="flex flex-col min-h-screen items-center justify-center px-4">
      <div>
        <h1 className=" text-black text-3xl font-semibold mb-8">
          MAMAN RENTAL MOBIL
        </h1>
      </div>
      <FormAuth title="Daftar" subTitle="Lengkapi Data Diri Anda">
        <form onSubmit={Formik.handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="Nama Depan"
              className={`input input-neutral w-full bg-white text-black ${
                Formik.touched.first_name && Formik.errors.first_name ? "input-error" : ""
              }`}
              value={Formik.values.first_name}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              autoComplete="off"
            />

            {Formik.touched.first_name && Formik.errors.first_name && (
              <p className="mt-1 text-sm text-error">{Formik.errors.first_name}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              placeholder="Nama Belakang"
              className={`input input-neutral w-full bg-white text-black ${
                Formik.touched.last_name && Formik.errors.last_name ? "input-error" : ""
              }`}
              value={Formik.values.last_name}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              autoComplete="off"
            />

            {Formik.touched.last_name && Formik.errors.last_name && (
              <p className="mt-1 text-sm text-error">{Formik.errors.last_name}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Nomor Telpon"
              className={`input input-neutral w-full bg-white text-black ${
                Formik.touched.phone && Formik.errors.phone ? "input-error" : ""
              }`}
              value={Formik.values.phone}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              autoComplete="off"
            />

            {Formik.touched.phone && Formik.errors.phone && (
              <p className="mt-1 text-sm text-error">{Formik.errors.phone}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={Formik.values.email}
              placeholder="Email"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              className={`input input-neutral w-full bg-white text-black ${Formik.touched.email && Formik.errors.email ? "input-error" : ""}`}
            />

            {Formik.touched.email && Formik.errors.email && (
              <p className="mt-1 text-sm text-error">{Formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={Formik.values.password}
              placeholder="Password"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              className={`input input-neutral w-full bg-white text-black ${Formik.touched.password && Formik.errors.password ? "input-error" : ""}`}
            />

            {Formik.touched.password && Formik.errors.password && (
              <p className="mt-1 text-sm text-error">{Formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-gray-700 hover:bg-gray-800 w-full"
          >
            Daftar
          </button>

          <div className="text-center text-sm text-black">
            Sudah mempunyai akun?{" "}
            <NavLink to="/register" className="link link-primary">
              Masuk
            </NavLink>
          </div>

          <button
            type="button"
            onClick={toBeranda}
            className="btn btn-outline bg-gray-700 hover:bg-gray-900 w-full"
          >
            Ke Beranda
          </button>
        </form>
      </FormAuth>
    </section>
  );
}

// import { Button, Form } from "react-bootstrap";
// import FormAuth from "../../components/FormAuth";
// import * as Yup from "yup";
// import useAxios from "../../hooks/useAxios";
// import { useFormik } from "formik";
// import { useNavigate, NavLink } from "react-router-dom";
// import useLoading from "../../hooks/useLoading";
// import { toast } from "react-toastify";

// export default function Register() {
//   const schema = Yup.object({
//     first_name: Yup.string()
//       .required("Nama depan tidak boleh kosong")
//       .min(1, "Nama depan tidak boleh kosong")
//       .trim(),
//     last_name: Yup.string().trim(),
//     phone: Yup.string()
//       .required("Nomor hanphone tidak boleh kosong")
//       .min(1, "Nomor hanphone tidak boleh kosong")
//       .matches(
//         /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
//         "Nomor hanphone tidak valid"
//       ),
//     email: Yup.string()
//       .required("Email tidak boleh kosong")
//       .email("Email tidak valid"),
//     password: Yup.string()
//       .required("Password tidak boleh kosong")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
//         "Minimal 6 karakter, satu huruf besar dan satu angka"
//       ),
//   });

//   const initialForm = {
//     first_name: "",
//     last_name: "",
//     phone: "",
//     email: "",
//     password: "",
//   };

//   const axios = useAxios();
//   const navigateTo = useNavigate();
//   const { showLoading, hideLoading } = useLoading();

//   function onSubmitForm(values) {
//     showLoading();
//     axios
//       .post("/api/v1/user/register", values)
//       .then(() => {
//         navigateTo("/login");
//         // console.log("coba", response.data.data);
//         toast.success("Daftar berhasil, silahkan masuk");
//       })
//       .catch((error) => {
//         let { message } = error.response.data;
//         toast.error(message);
//       })
//       .finally(() => {
//         hideLoading();
//       });
//   }

//   const Formik = useFormik({
//     initialValues: initialForm,
//     validationSchema: schema,
//     onSubmit: onSubmitForm,
//   });

//   function toBeranda() {
//     navigateTo("/");
//   }
//   return (
//     <main
//       id="register--form"
//       className=" d-flex justify-content-center align-items-center min-vh-100"
//     >
//       <FormAuth title="Buat Akun" subTitle="Selamat datang!">
//         <Form onSubmit={Formik.handleSubmit}>
//           <Form.Group className=" mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Nama depan"
//               name="first_name"
//               value={Formik.values.first_name}
//               onChange={Formik.handleChange}
//               className=" border-secondary"
//               isInvalid={!!Formik.errors.first_name}
//               autoComplete="off"
//             />

//             <Form.Control.Feedback type="invalid">
//               {Formik.errors.first_name}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className=" mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Nama belakang"
//               name="last_name"
//               value={Formik.values.last_name}
//               onChange={Formik.handleChange}
//               className=" border-secondary"
//               autoComplete="off"
//             />
//           </Form.Group>

//           <Form.Group className=" mb-3">
//             <Form.Control
//               type="string"
//               placeholder="Nomor hanphone"
//               name="phone"
//               value={Formik.values.phone}
//               onChange={Formik.handleChange}
//               className=" border-secondary"
//               isInvalid={!!Formik.errors.phone}
//               autoComplete="off"
//             />

//             <Form.Control.Feedback type="invalid">
//               {Formik.errors.phone}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className=" mb-3">
//             <Form.Control
//               type="email"
//               placeholder="Email"
//               name="email"
//               value={Formik.values.email}
//               onChange={Formik.handleChange}
//               className=" border-secondary"
//               isInvalid={!!Formik.errors.email}
//               autoComplete="off"
//             />

//             <Form.Control.Feedback type="invalid">
//               {Formik.errors.email}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className=" mb-3">
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={Formik.values.password}
//               onChange={Formik.handleChange}
//               className=" border-secondary"
//               isInvalid={!!Formik.errors.password}
//               autoComplete="off"
//             />
//             <Form.Control.Feedback type="invalid">
//               {Formik.errors.password}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Button variant="dark" type="submit" className=" w-100">
//             Daftar
//           </Button>

//           <span className=" d-flex">
//             <p className=" mt-3">
//               Sudah mempunyai akun? Silahkan masuk{" "}
//               <NavLink className="text-primary" to="/login">
//                 Di sini
//               </NavLink>{" "}
//             </p>
//           </span>
//           <Button size="sm" onClick={toBeranda} variant="outline-primary">
//             Ke beranda
//           </Button>
//         </Form>
//       </FormAuth>
//     </main>
//   );
// }
