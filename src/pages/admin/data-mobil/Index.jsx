import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilFilter from "../../../components/admin/data-mobil/DataMobilFilter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import ListProduct from "./ListProduct";
ListProduct

export default function DataMobil () {
    const navigateTo = useNavigate();
    const {showLoading, hideLoading} = useLoading();

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
        setParams((params) => {
            return {...params, [name]: value}
        })
    }

    const onSearch = () => {
        console.log("THIS", params)
    }


    let navList = [
        {
            to:"/",
            title: "Data Mobil",
            isActive: true,
        },
    ]

    const axios = useAxios();

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        showLoading(); 

        axios.get("api/v1/product",)
        .then((response) => {
            setProducts(response.data.data)
        }).catch((error) => {
            let messageError = error.response.data.message;
            // let { message } = errors[0];
            console.error("ERROR", messageError)
            toast.error(messageError)
        }).finally(() => {
            hideLoading()
        })
    }, [])


    return (
        <section id="list--data--mobil" className=" min-vh-100">
            <NavBreadcrumb navList={navList} />

            <DataMobilFilter q={params.q} sort_by={params.sort_by} onChangeValue={onChangeParams} onClickSearch={onSearch} onCreateNew={() => navigateTo("/admin/data-mobil/buat-baru")} />

            <ListProduct dataProduct={products} />
        </section>
    )
}