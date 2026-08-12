import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import useAxios from "../hooks/useAxios";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListProductCust from "../components/customer/ListProductCust";

const slides = [
  {
    id: 1,
    image: "/img/Toyota86garage.png",
    title: "slide1",
  },
  {
    id: 2,
    image: "/img/rubicon.jpg",
    title: "slide2",
  },
  {
    id: 3,
    image: "/img/garage.jpg",
    title: "slide2",
  },
];

export default function Beranda() {
  const { showLoading, hideLoading } = useLoading();
  const axios = useAxios();
  const [products, setProducts] = useState([]);
  const { token, role } = useSelector((store) => store.user);

  

  const params = {
    q: "",
    page: 1,
    per_page: 8,
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  }

  useEffect(() => {
    showLoading();
    axios
      .get("/api/v1/customer/product", { params: { ...params } })
      .then((response) => {
        console.log("res", response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log("error", error.response.data);
      })
      .finally(() => {
        hideLoading();
      });
  }, []);

  return (
    <div>
      <section>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className=" overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full lg:h-[500px] object-cover md:h-[250px]"
              />

              <div></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Kenapa Memilih Kami?</h2>
        <div className="flex flex-col md:flex-row gap-8 px-4 mt-8 text-gray-700">
          <div className="px-4 py-6 border rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Banyak Pilihan</h3>
            <p>Tersedia berbagai jenis mobil tersedia sesuai kebutuhan Anda dan keluarga</p>
          </div>
          <div className="px-4 py-6 border rounded shadow sm:py-6">
            <h3 className="text-xl font-semibold mb-2">Syarat Simpel</h3>
            <p>Cukup dengan melengkapi dokumen KTP, SIM A dan NPWP</p>
          </div>
          <div className="px-4 py-6 border rounded shadow sm:px-6">
            <h3 className="text-xl font-semibold mb-2">Pembayaran Mudah</h3>
            <p>Tersedia QRIS, Transfer bank, dompet digital dan metode lainnya</p>
          </div>
        </div>
      </section>

      <section className="text-center mt-16 text-gray-700">
        <h1 className="text-2xl font-bold text-center">Armada Kami</h1>
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-10">
          <ListProductCust dataProduct={products} />
        </div>

        <div>
          <NavLink to="/data-mobil">
            <button className="cursor-pointer text-gray-700 rounded-lg border border-gray-800 px-4 hover:scale-110 duration-500 transition hover:bg-gray-800 hover:text-white">
              Lihat Lebih Banyak
            </button>
          </NavLink>
        </div>
      </section>

      <section className="mt-16 px-16 py-16 grid lg:grid-cols-2 md:grid-rows-1 bg-gray-800 text-white">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">MAMAN RENTAL MOBIL</h2>
          <p className="mt-4">Hadir untuk memberikan pengalaman rental mobil yang nyaman <br /> dan terpercaya dengan pilihan armada lengkap</p>
        </div>
        <div className="flex flex-col mt-4 md:items-center md:justify-center">
          <p className="text-lg font-semibold text-center">Quick link</p>
          <ul className="ps-32">
            <li className="hover:scale-110 duration-500 transition hover:text-gray-400 cursor-pointer">Beranda</li>
            <li className="hover:scale-110 duration-500 transition hover:text-gray-400 cursor-pointer">Armada Kami</li>
            <li className="hover:scale-110 duration-500 transition hover:text-gray-400 cursor-pointer">Email: info@mamanrentalmobil.com</li>
            <li className="hover:scale-110 duration-500 transition hover:text-gray-400 cursor-pointer">Whatsapp: 089 123 456 789</li>
          </ul>
          
        </div>
      </section>


  
    </div>
  );
}

// /* eslint-disable react-hooks/exhaustive-deps */
// import { Carousel, Row, Col, Button } from "react-bootstrap";
// import ListProductCust from "../components/customer/ListProductCust";
// import useAxios from "../hooks/useAxios";
// import useLoading from "../hooks/useLoading";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import moment from "moment";
// import "../assets/CSS/Beranda.css"

// export default function Beranda() {
//   const captionCustom = {
//     // position: "flex",
//     // top: "60%",
//     // left: "50%",
//     // transform: "translate(-50%, -50%)",
//     // textAlign: "center",
//     // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
//     WebkitTextStroke: "0.5px black",
//   };

//   const { showLoading, hideLoading} = useLoading()
//   const axios = useAxios();
//   const [ products, setProducts] = useState([])
//   const navigateTo = useNavigate()
//   const { token, role } = useSelector((store) => store.user);

//   function seeMore() {
//     if (token && role == "customer") {
//       navigateTo("/customer/rental-customer")
//     } else {
//       navigateTo("/data-mobil")
//     }
//   }

//   const params = {
//     q: "",
//     page: 1,
//     per_page: 8,
//     start_date: moment().format("YYYY-MM-DD"),
//     end_date: moment().format("YYYY-MM-DD"),
//   }

//   useEffect(() => {
//     showLoading();
//     // /api/v1/customer/product?q=&page=1&per_page=2"
//     axios
//       .get("/api/v1/customer/product", {params: { ...params}}
//       )
//       .then((response) => {
//         // console.log("res", response.data.data);
//         setProducts(response.data.data)
//       })
//       .catch((error) => {
//         console.log("error", error.response.data);
//       })
//       .finally(() => {
//         hideLoading();
//       });
//   }, []);

//   return (
//     <>
//     <Row>
//       <Col className="jumbo-text">text</Col>
//       <Col>Gambar</Col>
//     </Row>
//       <Carousel data-bs-theme="light" keyboard="true" className=" mb-5 d-flex">
//         <Carousel.Item>
//           <img
//             className=" d-block w-100"
//             src="/img/Toyota86garage.png"
//             alt="slide1"
//           />
//           <Carousel.Caption style={captionCustom}>
//             <h5 className=" mb-5 mb text-h2">MAMAN RENTAL MOBIL</h5>
//             <p className=" text-s1">Rental mobil kini sangat mudah</p>
//             <p>Anda tidak perlu datang langsung untuk booking</p>
//           </Carousel.Caption>
//         </Carousel.Item>

//         <Carousel.Item>
//           <img className=" d-block w-100" src="/img/rubicon.jpg" alt="slide1" />
//           <Carousel.Caption style={captionCustom}>
//             <h5 className=" mb-5 mb text-h2">MAMAN RENTAL MOBIL</h5>
//             <p className=" text-s1">Banyak pilihan mobil</p>
//             <p>Kami menyediakan berbagai jenis mobil sesuai kebutuhan anda</p>
//           </Carousel.Caption>
//         </Carousel.Item>

//         <Carousel.Item>
//           <img className=" d-block w-100" src="/img/garage.jpg" alt="slide1" />
//           <Carousel.Caption style={captionCustom}>
//             <h5 className=" mb-5 mb text-h2">MAMAN RENTAL MOBIL</h5>
//             <p className=" text-s1">Buru diskon menarik</p>
//             <p>Banyak dskon menarik yang kami sediakan</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>

//       <Row  className=" d-flex justify-content-center text-center">
//         <Col>
//           <p className=" text-h1">Langkah Mudah Maman Rental Mobil</p>
//           <p>Silahkan simak langkah-langkah berikut:</p>
//         </Col>
//       </Row>
//       <Row className=" d-flex justify-content-center text-center mt-3">
//         <Col className=" py-3 px-3" sm="12" lg="4">
//           <p className=" text-h4">Cari Kendaraan</p>
//           <p>Sesuai dengan keinginan anda dan keluarga</p>
//         </Col>
//         <Col className="  py-3 px-3" sm="12" lg="4">
//           <p className=" text-h4">Melengkapi Syarat Dokumen</p>
//           <p>Cukup dengan melengkapi dokumen KTP, SIM A dan NPWP</p>
//         </Col>
//         <Col className=" py-3 px-3" sm="12" lg="4">
//           <p className=" text-h4">Metode Pembayaran</p>
//           <p>Tersedia Transer bank, dompet digital dan metode lainnya</p>
//         </Col>
//       </Row>

//       <ListProductCust dataProduct={products} />

//       <div className=" text-center">
//         <Button className=" rounded-0" variant="outline-dark" onClick={seeMore}>Tampilkan lebih banyak</Button>
//       </div>

//       <img
//         src="/img/Butuh Bantuan.png"
//         alt="contact us"
//         className=" d-block mt-5"
//         style={{ height: "550px", width: "100%" }}
//       />

//     </>
//   );
// }
