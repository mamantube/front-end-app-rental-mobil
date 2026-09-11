import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilFilter from "../../../components/admin/data-mobil/DataMobilFilter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import ListProduct from "../../../components/admin/data-mobil/ListProduct";
import PaginationButton from "../../../components/PaginationButton";

const navList = [
  {
    to: "/admin/data-transaksi",
    title: "Data Transaksi",
    isActive: false,
  },
  {
    to: "/admin/data-mobil",
    title: "Data Mobil",
    isActive: true,
  },
];

export default function DataMobil() {
  const navigateTo = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const axios = useAxios();

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  // Nilai yang ada di input
  const [params, setParams] = useState({
    q: "",
    sort_by: "",
  });

  // Nilai yang digunakan untuk request API
  const [searchParams, setSearchParams] = useState({
    q: "",
    sort_by: "",
    page: 1,
    per_page: 8,
  });

  // Ketika input berubah
  const onChangeParams = (event) => {
    const { name, value } = event.target;

    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tombol Cari Mobil
  const onSearchProduct = () => {
    setSearchParams((prev) => ({
      ...prev,
      q: params.q,
      sort_by: params.sort_by,
      page: 1,
    }));
  };

  // Pagination
  const onPagePagination = (page) => {
    setSearchParams((prev) => ({
      ...prev,
      page,
    }));
  };

  // Request API
  const searchProduct = async () => {
    try {
      showLoading();

      const response = await axios.get("/api/v1/product", {
        params: searchParams,
      });

      console.log("DATA PRODUCT:", response.data);

      setProducts(response.data.data || []);

      const total = response.data.pagination?.total || 0;

      const resultTotalPage = Math.ceil(total / searchParams.per_page);

      setTotalPage(resultTotalPage);
    } catch (error) {
      console.error("ERROR GET PRODUCTS:", error.response?.data || error);

      setProducts([]);
      setTotalPage(0);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    searchProduct();
  }, [searchParams.page, searchParams.q, searchParams.sort_by]);

  return (
    <section
      id="list-data-mobil"
      className="min-h-screen bg-gray-50 px-4 pb-10"
    >
      <h2 className="mb-4 pt-4 text-center text-2xl font-semibold text-gray-700">
        Data Kendaraan
      </h2>

      {/* Breadcrumb */}
      <NavBreadcrumb navList={navList} />

      {/* Filter */}
      <div className="flex justify-center mb-4">
        <div className="w-3/4">
          <DataMobilFilter
            q={params.q}
            sort_by={params.sort_by}
            onChangeValue={onChangeParams}
            onClickSearch={onSearchProduct}
            onCreateNew={() => navigateTo("/admin/data-mobil/buat-baru")}
          />
        </div>
      </div>

      {/* List Product */}
      <ListProduct dataProduct={products} />

      {/* Pagination */}
      <PaginationButton
        dataProduct={products}
        currentPage={searchParams.page}
        onPage={onPagePagination}
        totalPage={totalPage}
      />
    </section>
  );
}
