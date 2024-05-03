import FormAuth from "../../components/FormAuth";
import { Button, Form } from "react-bootstrap";
import { useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom"






export default function Adminlogin () {
    const schema = Yup.object({
        email: Yup.string().required("Email harus diisi").email("Format email salah"),
        password: Yup.string().required("Password harus diisi").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Minimal 6 karakter, satu huruf besar dan satu angka")
    })
    
    const initialForm = {
        email: "",
        password: "",
    }

    const { showLoading, hideLoading } = useLoading();

    const dispatch = useDispatch();
    const navigateTo = useNavigate()

    function onSubmitForm(values) {
        showLoading()
        console.log("INI", values)

        axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/user/login`, values)
        .then((response) => {
            let { token } = response.data.data;

            localStorage.setItem("token", token);

            dispatch({ type: "SET_TOKEN", value: token})
            // console.log("INI", response.data.data)
            toast.success("Login Berhasil")
            navigateTo("/admin/data-mobil")
        }).catch((error) => {
            let messageError = error.response.data.message;
            // let { message } = errors[0];
            console.error("ERROR", messageError)
            toast.error(messageError)
        }).finally(() => {
            hideLoading()
        })
    }


    const Formik = useFormik({
        initialValues: initialForm,
        validationSchema: schema,
        onSubmit: onSubmitForm
    })

    const { token } = useSelector((store) => store.user);
    if (token) return <Navigate to="/admin/data-mobil" replace />
    
    return (
        <main id="container__login__admin" className="d-flex justify-content-center align-items-center min-vh-100">
                <FormAuth title="Masuk ke Dashboard" subTitle="Masukkan Email dan Password Admin">
                    <Form onSubmit={Formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Email" className=" border-secondary" name="email" value={Formik.values.email} onChange={Formik.handleChange} isInvalid={!!Formik.errors.email} />
                            <Form.Control.Feedback type="invalid" >
                                {Formik.errors.email}
                            </Form.Control.Feedback>
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password" className=" border-secondary" name="password" value={Formik.values.password} onChange={Formik.handleChange} isInvalid={!!Formik.errors.password} />
                            <Form.Control.Feedback type="invalid" >
                                {Formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="dark" type="submit" className=" w-100">Masuk</Button>
                    </Form>
                </FormAuth>
        </main>
    )
}