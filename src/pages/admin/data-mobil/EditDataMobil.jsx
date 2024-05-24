import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import ProdukForm from "../../../components/admin/data-mobil/ProdukForm";
import NavBreadcrumb from "../../../components/NavBreadcrumb";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function EditDataMobil() {
  const { product_id } = useParams();

  let navList = [
    {
      to: "/admin/data-mobil",
      title: "Data Mobil",
      isActive: false,
    },
    {
      to: "/admin/data-mobil",
      title: "Edit",
      isActive: true,
    },
    {
      to: "/admin/data-mobil",
      title: product_id,
      isActive: true,
    },
  ];


  const [data, setData] = useState(null);

  const axios = useAxios();

  function handleRemoveProduct() {
    showLoading();

    axios
      .delete(`/api/v1/product/remove/${product_id}`)
      .then((response) => {
        console.log("RES", response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.log("ERR", error.response.data);
      })
      .finally(() => {
        hideLoading();
      });
  }


  function handleRestoreProduct() {
    showLoading();

    axios
      .patch(`/api/v1/product/restore/${product_id}`)
      .then((response) => {
        console.log("RES", response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.log("ERR", error.response.data);
      })
      .finally(() => {
        hideLoading();
      });
  }

  function handleUpdateForm(values) {
    toast.error("tets")
    console.log(values)
    // showLoading()
    // console.log("up", values)

    // axios.put(`/api/v1/product/${product_id}`)
    // .then((response) => {
    //     console.log("RES", response)
    // })
    // .catch((error) => {
    //     let { message, data } = error.response.data;

    //     if(data) {
    //         for (let resError of data.errors) {
    //             toast.error(resError.message)
    //             console.log("error", resError.message)
    //         }
    //         return
    //     }
    //     toast.error(message)
    // })
    // .finally(() => {
    //     hideLoading()
    // })
  }

  function getDetailProduct() {
    showLoading();

    axios
      .get(`/api/v1/product/${product_id}`)
      .then((response) => {
        console.log("Data", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("error", error.response);
      })
      .finally(() => {
        hideLoading();
      });
    console.log("ini");
  }

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    getDetailProduct();
  }, []);

  const isMaintenance = data ? data.deleted_at : false;
  const variantBtn =  isMaintenance ? "dark" : "danger";
  const labelBtn = isMaintenance ? "Selesai perbaikan" : "Perbaikan";

  function switchMaintenance() {
    if (isMaintenance) {
        handleRestoreProduct()
        return;
    }

    handleRemoveProduct()
  }

  return (
    <section id="edit--product">
      <NavBreadcrumb navList={navList} />

      <ProdukForm isEdit dataProduct={data} onSubmitForm={handleUpdateForm}>
        <Button
          type="button"
          variant={variantBtn}
          className=" rounded-0 ms-2"
          onClick={switchMaintenance}
        >
          {labelBtn}
        </Button>
      </ProdukForm>
    </section>
  );
}
