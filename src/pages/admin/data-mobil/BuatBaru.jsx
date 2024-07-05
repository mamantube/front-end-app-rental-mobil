import NavBreadcrumb from "../../../components/NavBreadcrumb";
import ProdukForm from "../../../components/admin/data-mobil/ProdukForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";


let navList = [
    {
        to:"/admin/data-mobil",
        title: "Data Mobil",
        isActive: false,
    },
    {
        to:"/admin/data-mobil/buat-baru",
        title: "Buat Baru",
        isActive: true,
    },
]

export default function BuatBaru () {

    const navigateTo = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    const axios = useAxios()

    const handleSubmitForm = (values) => {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
    
        // console.log("Test", values)
    
        showLoading();
    
        axios
          .post("/api/v1/product/new", formData)
          .then((response) => {
            toast.success(response.data.message)
    
            navigateTo("/admin/data-mobil");
          })
          .catch((error) => {
            let { message, data} = error.response.data;
    
            if (data) {
              for (let resError of data.errors) {
                toast.error(resError.message)
              }
              return
            }
            toast.error(message)
          })
          .finally(() => {
            hideLoading();
          });
      };
    return (
        <section id="buat--baru">
            <NavBreadcrumb navList={navList} />

            <ProdukForm onSubmitForm={handleSubmitForm} />
        </section>
    )
} 