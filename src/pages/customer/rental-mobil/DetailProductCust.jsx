import NavBreadcrumb from "../../../components/NavBreadcrumb";
import ProductDetail from "../../../components/customer/ProductDetail";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";

export default function DetailProductCust() {
  let navList = [
    {
      to: "/customer/rental-mobil",
      title: "Rental Mobil",
      isActive: false,
    },
    {
      to: "/customer/rental-mobil",
      title: "Detail Produk",
      isActive: true,
    },
  ];

  const { product_id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const axios = useAxios();
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  });

  function onChangeParams(event) {
    let { name, value } = event.target;
    setParams({ ...params, [name]: value });
  }

  function getDetailProduct() {
    showLoading();

    axios
      .get(`api/v1/customer/product/${product_id}`)
      .then((response) => {
        console.log("RES", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  useEffect(() => {
    getDetailProduct();
  }, []);
  return (
    <section className=" min-vh-100">
      <NavBreadcrumb navList={navList} />

      <ProductDetail
        dataProduct={data}
        start_date={params.start_date}
        end_date={params.end_date}
        onChangeValue={onChangeParams}
      />
    </section>
  );
}
