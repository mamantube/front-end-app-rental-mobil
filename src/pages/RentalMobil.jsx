/* eslint-disable react-hooks/exhaustive-deps */
import NavBreadcrumb from "../components/NavBreadcrumb";
import SearchProduct from "../components/customer/SearchProduct";
import { useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
import PaginationButton from "../components/PaginationButton";
import ListProductCust from "../components/customer/ListProductCust";
import useAxios from "../hooks/useAxios";
import moment from "moment";

export default function RentalMobil() {
  let navList = [
    {
      to: "/customer/beranda",
      title: "Beranda",
      isActive: false,
    },

    {
      to: "/customer/rental-mobil",
      title: "Rental Mobil",
      isActive: true,
    },
  ];

  const { showLoading, hideLoading } = useLoading();
  const [products, setProducts] = useState([]);
  const axios = useAxios();
  const [load, setLoad] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({
    q: "",
    page: 1,
    per_page: 20,
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  });

  function onChangeParams(event) {
    let { name, value } = event.target;
    setParams({ ...params, [name]: value });

    if (value.length === 0) setLoad(true);
  }

  function onSearchProduct() {
    setParams({ ...params, page: 1 });
    setLoad(true);
  }

  function onPagination(page) {
    // console.log("Ini", page, params);
    setParams({ ...params, page });

    setLoad(true);
    searchProduct();
  }

  function searchProduct() {
    showLoading();

    // console.log("test", params);

    axios
      .get("/api/v1/customer/product", { params })
      .then((response) => {
        setProducts(response.data.data);

        const { total } = response.data.pagination;

        let resultTotalPage = Math.ceil(total / params.per_page);

        setTotalPage(resultTotalPage);
      })
      .finally(() => {
        hideLoading();
        setLoad(false);
      });
  }

  useEffect(() => {
    showLoading();
    searchProduct();
  }, [load]);

  return (
    <section className=" min-vh-100">
      <NavBreadcrumb navList={navList} />

      <SearchProduct
        q={params.q}
        start_date={params.start_date}
        end_date={params.end_date}
        onClickSearch={onSearchProduct}
        onChangeValue={onChangeParams}
      />

      <ListProductCust dataProduct={products}/>

      <PaginationButton
        dataProduct={products}
        currentPage={params.page}
        onPage={onPagination}
        totalPage={totalPage}
      />
    </section>
  );
}
