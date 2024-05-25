import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const navigateTo = useNavigate()

  function handleRemoveProduct() {
    showLoading();

    axios
      .delete(`/api/v1/product/remove/${product_id}`)
      .then((response) => {
        toast.success(response.data.message)
        window.location.reload()
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message)
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
        toast.success(response.data.message)
        window.location.reload()
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message)
      })
      .finally(() => {
        hideLoading();
      });
  }

  function handleUpdateForm(values) {
      const formData = new FormData()
      
      for (const key in values) {
          if (values[key] != null)
            formData.append(key, values[key])
    }

    showLoading()

    axios.put(`/api/v1/product/${product_id}`, formData)
    .then((response) => {
        // console.log("RES", response)

        toast.success(response.data.message)

        navigateTo("/admin/data-mobil")
    })
    .catch((error) => {
        let { message, data } = error.response.data;

        if(data) {
            for (let resError of data.errors) {
                toast.error(resError.message)
                console.log("error", resError.message)
            }
            return
        }
        toast.error(message)
    })
    .finally(() => {
        hideLoading()
    })
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
        let { message } = error.response.data;
        toast.error(message)
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
