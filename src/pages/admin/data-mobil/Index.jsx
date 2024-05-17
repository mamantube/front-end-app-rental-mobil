/* eslint-disable react-hooks/exhaustive-deps */
import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilFilter from "../../../components/admin/data-mobil/DataMobilFilter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import ListProduct from "../../../components/admin/data-mobil/ListProduct";
import PaginationButton from "../../../components/PaginationButton";

let navList = [
    {
        to:"/admin/data-mobil",
        title: "Data Mobil",
        isActive: true,
    },
]

export default function DataMobil () {
    const navigateTo = useNavigate();
    const {showLoading, hideLoading} = useLoading();
    const [load, setLoad] = useState(true)

    const [params, setParams] = useState(
        {
            q: "",
            sort_by: "",
            page: 1,
            per_page: 20,
        }
    );

    const onChangeParams = (event) => {
        let { name, value} = event.target
        setParams({...params, [name]: value,})

        if (value.length === 0) setLoad(true)
    }

    // const onSearch = () => {
    //     searchProduct();
    //     console.log("THIS", params)
    // }

    function onSearchProduct() {
        setParams({...params, page: 1});
        setLoad(true)
    }

    const [totalPage, setTotalPage] = useState(0)

    const onPagePagination = (page) => {
        console.log("ini", page, params)
        setParams({...params, page})

        setLoad(true)
        searchProduct();
        
    }

    const axios = useAxios();

    const [ products, setProducts ] = useState([]);


    function searchProduct()  {
        showLoading(); 
        
        console.log("test", params)

        axios.get("api/v1/product", {params})
        .then((response) => {
            setProducts(response.data.data)
            console.log(response.data.data)

            const { total } = response.data.pagination;

            let resultTotalPage = Math.ceil(total/params.per_page)

            setTotalPage(resultTotalPage)
        })
        // .catch((error) => {
        //     let messageError = error.response.data.message;
        //     // let { message } = errors[0];
        //     console.error("ERROR", error.response.data)
        //     toast.error(messageError)
        // })
        .finally(() => {
            hideLoading();
            setLoad(false)
        })
    }

    useEffect(() => {
        if (load) searchProduct()

        // return () => {
        //     setLoad(false)
        //     setProducts([])

        // }
    }, [load])


    return (
        <section id="list--data--mobil" className=" min-vh-100">
            <NavBreadcrumb navList={navList} />

            <DataMobilFilter q={params.q} sort_by={params.sort_by} onChangeValue={onChangeParams} onClickSearch={onSearchProduct} onCreateNew={() => navigateTo("/admin/data-mobil/buat-baru")} />

            <ListProduct dataProduct={products} />

            <PaginationButton dataProduct={products} currentPage={params.page} onPage={onPagePagination} totalPage={totalPage} />
        </section>
    )
}