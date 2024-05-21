/* eslint-disable react/prop-types */
import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";

export default function ProdukForm(props) {
  const { onSubmitForm } = props;
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

  const [srcImage, setSrcImage] = useState(null)

  const handleChangeFile = (event) => {
    console.log("INI", event.target.files[0]);

    let file = event.target.files[0]
    Formik.values.image = file;
    setSrcImage(URL.createObjectURL(file))
    Formik.setFieldTouched("image", true);
  };

  const refInputFile = useRef();

  const onResetForm = () => {
    refInputFile.current.value = null;

    setSrcImage(null)
    Formik.resetForm({
      values: initialForm,
      touched: {},
    });
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schemaValidation,
    onSubmit: (values) => onSubmitForm(values),
  });

  const styleImg = {
    height: "306px",
    width: "100%",
    objectFit: "contain",
    opjectPosition: "center",
    border: "1px solid #ccc"
  }

  return (
    <Row>
      <Col md="3" sm="12">
        <img
          src={srcImage ? srcImage : "/img/placeholder.png"}
          alt="product image"
          style={styleImg}
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

          <Button type="button" className=" rounded-0" onClick={onResetForm}>
            Reset
          </Button>

          <Button type="submit" variant="success" className=" rounded-0 mx-2">
            Buat data baru
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
