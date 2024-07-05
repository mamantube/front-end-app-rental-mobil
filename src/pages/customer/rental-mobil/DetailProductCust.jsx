import NavBreadcrumb from "../../../components/NavBreadcrumb";
import ProductDetail from "../../../components/customer/ProductDetail";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";

export default function DetailProductCust() {
  const { product_id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const axios = useAxios();
  const [data, setData] = useState([]);
  const navigateTo = useNavigate()
  const [params, setParams] = useState({
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    user_id: localStorage.getItem("id"),
    product_ids: [product_id]
  });

  let navList = [
    {
      to: "/customer/rental-mobil",
      title: "Rental Mobil",
      isActive: false,
    },
    {
      to: "/customer/rental-mobil",
      title: data.name,
      isActive: true,
    },
  ];


  function onChangeParams(event) {
    let { name, value } = event.target;
    setParams({ ...params, [name]: value });
  }

  function getDetailProduct() {
    showLoading();

    axios
      .get(`api/v1/customer/product/${product_id}`)
      .then((response) => {
        // console.log("RES", response.data.data);
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

  

  function onRentalMobil() {
    showLoading()

    axios.post("api/v1/transaction/checkout", {
      rental_duration : {
        start_date: params.start_date,
        end_date: params.end_date,
      },
      user_id: params.user_id,
      product_ids: params.product_ids
    })
    .then((response) => {
      const { token} = response.data.data
      
      // console.log("RES", response.data.data)
      window.snap.pay(token, {
        onSuccess: function() {
          navigateTo("/customer/data-transaksi")
        },
        onPending: function() {
          navigateTo("/customer/data-transaksi")
        },
        onError: function() {
          navigateTo("/customer/data-transaksi")
        },
        onClose: function() {
          toast.success("Anda tidak jadi booking")
          onRejectRent(token)
          navigateTo(getDetailProduct)
        },
      })
    })
    .catch((error) => {
      toast.error(error.response.data)
    })
    .finally(() => {
      hideLoading()
    })
  }

  async function onRejectRent(token) {
    // console.log("token", token)
    await axios.delete(`/api/v1/transaction/erase/${token}`)
    .then(() => {
      // console.log("reject", response.data.data)
      toast.success("Anda tidak jadi booking")
    }).catch((error) => {
      toast.error(error.response.data)
    }) 
  }
  return (
    <section className=" min-vh-100">
      <NavBreadcrumb navList={navList} />

      <ProductDetail
        dataProduct={data}
        start_date={params.start_date}
        end_date={params.end_date}
        onChangeValue={onChangeParams}
        onRental={onRentalMobil}
      />
    </section>
  );
}
