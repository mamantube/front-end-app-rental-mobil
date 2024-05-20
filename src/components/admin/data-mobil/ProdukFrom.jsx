import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProdukForm() {
  const schemaValidation = Yup.object({
    name: Yup.string()
      .required("Nama mobil tidak boleh kosong")
      .max(25, "Maksimal 25 kareakter")
      .trim(),
    price: Yup.number()
      .integer("Harga tidak boleh bilangan desimal")
      .positive("Harga tidak boleh kosong"),
    description: Yup.string()
      .required("Deskripsi mobil tidak boleh kosong")
      .min(20, "Masukkan minimal 20 karakter")
      .max(250, "Maksimal hanya 250 karakter")
      .trim(),
    image: Yup.mixed().required("Foto tidak boleh kosong"),
  });

  const initialForm = {
    name: "",
    price: 0,
    description: "",
    image: null,
  };

  

  const handleChangeFile = (event) => {
    console.log("INI", event.target.files[0]);

    Formik.values.image = event.target.files[0];
    Formik.setFieldTouched("image", true);
  };

  const refInputFile = useRef();

  const onResetForm = () => {
    refInputFile.current.value = null
    Formik.resetForm({
      values: initialForm,
      touched: {},
    });
  };

  const { showLoading, hideLoading } = useLoading();

  const navigateTo = useNavigate();

  const axios = useAxios();

  const onSubmitForm = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    showLoading();

    axios
      .post("/api/v1/product/new", formData)
      .then((response) => {
        console.log("RES", response);

        // navigateTo("/admin/data-mobil");
      })
      .finally(() => {
        hideLoading();
      });
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schemaValidation,
    onSubmit: onSubmitForm,
  });
  
  

  return (
    <Row>
      <Col md="3" sm="12">
        <img
          src="/img/placeholder.png"
          alt="product image"
          className=" w-100"
        />
      </Col>
      <Col md="9" sm="12" className="p-16">
        <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className=" mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Nama Mobil"
              id="product-name"
              value={Formik.values.name}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.name}
              autoComplete="off"
              className=" rounded-0"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" mb-3">
            <Form.Control
              type="number"
              name="price"
              placeholder="Harga Mobil"
              id="product-price"
              value={Formik.values.price}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.price}
              className=" rounded-0"
              autoComplete="off"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" mb-3">
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              id="product-description"
              name="description"
              placeholder="Deskripsi Mobil"
              value={Formik.values.description}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.description}
              className=" rounded-0"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" rounded-0 mb-3">
            <Form.Control
              ref={refInputFile}
              type="file"
              id="product-image"
              name="image"
              onChange={handleChangeFile}
              isInvalid={!!Formik.errors.image}
              accept=".jpg, .jpeg .png"
              className=" rounded-0"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="button"
            className=" rounded-0 me-2"
            onClick={onResetForm}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="success"
            className=" rounded-0"
            onClick={onSubmitForm}
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
