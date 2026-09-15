import NavBreadcrumb from "../../../components/NavBreadcrumb";
import ProdukForm from "../../../components/admin/data-mobil/ProdukForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";

let navList = [
  {
    to: "/admin/data-mobil",
    title: "Data Mobil",
    isActive: false,
  },
  {
    to: "/admin/data-mobil/buat-baru",
    title: "Buat Baru",
    isActive: true,
  },
];

export default function BuatBaru() {
  const navigateTo = useNavigate();

  const { showLoading, hideLoading } = useLoading();

  const axios = useAxios();

  const handleSubmitForm = async (values) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      showLoading();

      const response = await axios.post("/api/v1/product/new", formData);

      toast.success(response.data.message);

      navigateTo("/admin/data-mobil");
    } catch (error) {
      console.error(
        "Gagal Menambahkan Mobil Baru",
        error.response?.data || error,
      );
      const { message, data } = error.response?.data || {};

      if (data?.errors) {
        data.errors.forEach((resError) => {
          toast.error(resError.message);
        });

        return;
      }

      toast.error(message || "Gagal Menambahkan Mobil Baru");
    } finally {
      hideLoading();
    }
  };
  return (
    <section id="buat-baru" className="min-h-screen bg-gray-50 px-4 pb-10">
      <NavBreadcrumb navList={navList} />

      <ProdukForm onSubmitForm={handleSubmitForm} />
    </section>
  );
}
