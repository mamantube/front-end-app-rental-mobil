/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel, Row, Col, Button } from "react-bootstrap";
import ListProductCust from "../components/customer/ListProductCust";
import useAxios from "../hooks/useAxios";
import useLoading from "../hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Beranda() {
  const captionCustom = {
    // position: "flex",
    // top: "60%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // textAlign: "center",
    // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    WebkitTextStroke: "0.5px black",
  };

  const { showLoading, hideLoading} = useLoading()
  const axios = useAxios();
  const [ products, setProducts] = useState([])
  const navigateTo = useNavigate()
  const { token, role } = useSelector((store) => store.user);

  function seeMore() {
    if (token && role == "customer") {
      navigateTo("/customer/rental-customer")
    } else {
      navigateTo("/data-mobil")
    }
  }

  const params = {
    q: "",
    page: 1,
    per_page: 8,
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  }

  useEffect(() => {
    showLoading();
    // /api/v1/customer/product?q=&page=1&per_page=2"
    axios
      .get("/api/v1/customer/product", {params: { ...params}}
      )
      .then((response) => {
        // console.log("res", response.data.data);
        setProducts(response.data.data)
      })
      .catch((error) => {
        console.log("error", error.response.data);
      })
      .finally(() => {
        hideLoading();
      });
  }, []);

  return (
    <>
      <Carousel data-bs-theme="light" keyboard="true" className=" mb-5 d-flex">
        <Carousel.Item>
          <img
            className=" d-block w-100"
            src="/img/Toyota86garage.png"
            alt="slide1"
          />
          <Carousel.Caption style={captionCustom}>
            <h5 className=" mb-5 mb text-h2">MAMAN RENTAL MOBIL</h5>
            <p className=" text-s1">Rental mobil kini sangat mudah</p>
            <p>Anda tidak perlu datang langsung untuk booking</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className=" d-block w-100" src="/img/rubicon.jpg" alt="slide1" />
          <Carousel.Caption style={captionCustom}>
            <h5 className=" mb-5 mb text-h2">MAMAN RENTAL MOBIL</h5>
            <p className=" text-s1">Banyak pilihan mobil</p>
            <p>Kami menyediakan berbagai jenis mobil sesuai kebutuhan anda</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className=" d-block w-100" src="/img/garage.jpg" alt="slide1" />
          <Carousel.Caption style={captionCustom}>
            <h5 className=" mb-5 mb text-h2">MAMAN RENTAL MOBIL</h5>
            <p className=" text-s1">Buru diskon menarik</p>
            <p>Banyak dskon menarik yang kami sediakan</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Row  className=" d-flex justify-content-center text-center">
        <Col>
          <p className=" text-h1">Langkah Mudah Maman Rental Mobil</p>
          <p>Silahkan simak langkah-langkah berikut:</p>
        </Col>
      </Row>
      <Row className=" d-flex justify-content-center text-center mt-3">
        <Col className=" py-3 px-3" sm="12" lg="4">
          <p className=" text-h4">Cari Kendaraan</p>
          <p>Sesuai dengan keinginan anda dan keluarga</p>
        </Col>
        <Col className="  py-3 px-3" sm="12" lg="4">
          <p className=" text-h4">Melengkapi Syarat Dokumen</p>
          <p>Cukup dengan melengkapi dokumen KTP, SIM A dan NPWP</p>
        </Col>
        <Col className=" py-3 px-3" sm="12" lg="4">
          <p className=" text-h4">Metode Pembayaran</p>
          <p>Tersedia Transer bank, dompet digital dan metode lainnya</p>
        </Col>
      </Row>

      <ListProductCust dataProduct={products} />

      <div className=" text-center">
        <Button className=" rounded-0" variant="outline-dark" onClick={seeMore}>Tampilkan lebih banyak</Button>
      </div>

      <img
        src="/img/Butuh Bantuan.png"
        alt="contact us"
        className=" d-block mt-5"
        style={{ height: "550px", width: "100%" }}
      />

      
    </>
  );
}
