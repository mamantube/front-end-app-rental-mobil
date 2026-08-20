import { useState, useEffect, useMemo } from "react";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { formatIDR } from "../../../utils/formater";
import { useNavigate } from "react-router-dom";




export default function Transaction() {  
    const userId = localStorage.getItem("id");
    const { showLoading, hideLoading } = useLoading();
    const [ transactions, setTransactions ] = useState([]);
    
    const navigateTo = useNavigate();
    const axios = useAxios();

    const getTransactions = () => {
        if (!userId) {
            toast.error("id pengguna tidak ditemukan");
            return;
        }

        showLoading();

        axios.get(`api/v1/transaction/${userId}`)
        .then((response) => {
            console.log("Data Transaksi:", response.data.data)

            setTransactions(response.data.data || []);
        })
        .catch((error) => {
            console.error("Error transaksi:", error);

            toast.error(error.response?.data?.message || "Gagal memuat transaksi")
        })
        .finally(() => {
            hideLoading()
        });
    };

    useEffect(() => {
        getTransactions();
    }, []);

    const onPay = (transaction) => {
        if(!transaction.token) {
            toast.error("Token Pembayaran tidak ditemukan")
        }

        window.snap.pay(transaction.token, {
            onSuccess: function () {
                toast.success("Pembayaran Berhasil");

                getTransactions();
                navigateTo("/customer/data-transaksi")
            },
            onPending: function () {
                toast.info("Masih menunggu pembayaran");

                getTransactions();
                navigateTo("/customer/data-transaksi")
            },
            onClose: function () {
                toast.info("Anda menutup halaman pemayaran")

                navigateTo("/customer/data-transaksi")

            },
            onError: function () {
                toast.error("Pembayaran gagal")
                navigateTo("/customer/data-transaksi")
            }

        })
    }

    const getRentalDuration = (startDate, endDate) => {
        const start = moment(startDate);
        const end = moment(endDate);

        return end.diff(start, "days") + 1;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "settlement":
            case "capture": 
                return "bg-green-100 text-green-700";
            case "failuer":
                return "bg-red-100 text-red-700";
            case "refund":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-gray-100 text-gray-700"
            
            
        }
    }

    const statusText = (status) => {
        switch (status) {
            case "pending":
                return "Menunggu Pembayaran";
            case "settlement":
                return "Pembayaran Berhasil";
            case "capture":
                return "Pembayaran Berhasil";
            case "failuer":
                return "Pembayaran Gagal";
            case "refund":
                return "Dana Dikembalikan";
            default:
                return status;
        }
    };


    return (
        <section className="min-h-screen bg-gray-50 px-4 pb-8 pt-16 sm:px-6 lg:px8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black">Data Transaksi</h1>
                    <p className="mt-2 text-black">Berikut adalah data transaksi anda</p>
                </div>
                {!transactions.length ? (
                    <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-white shadow-sm">
                        <div className="text-center">
                            <div className="mb-4 text-5xl">
                                🚗
                            </div>
                            <p className="mt-2 text-black">
                                Anda belum memiliki transaksi rental mobil
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {transactions.map((transaction) => {
                            const product = transaction.product_ids?.[0];
                            const duration = getRentalDuration(
                                transaction.rental_duration.start_date,
                                transaction.rental_duration.end_date,
                            );

                            return (
                                <div key={transaction._id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-400">
                                    <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between text-black">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Order ID</p>

                                            <p className="mt-1 font-semibold text-gray-800">{ transaction.order_id }</p>
                                        </div>

                                        <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(transaction.status)}`}>
                                            { statusText(transaction.status)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col  gap-3 p-4 md:flex-row">
                                        {product?.storage_id.secure_url ? (
                                            <img src={product.storage_id.secure_url} alt={product.name} className="w-1/8 object-cover"/>
                                        ) : (
                                            <div className="text-sm text-gray-800">
                                                Gambar tidak tersedia
                                            </div>
                                        )}
                                        <div className="flex flex-col ps-6 justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-800">
                                                    {product.name}
                                                </h2>

                                                { product?.price && (
                                                    <p className="mt-1 text-sm font-medium text-gray-500"> { formatIDR(product.price)} </p>
                                                )}

                                                {/* {product?.description && (
                                                    <p className="mt-1 text-sm text-gray-700"> { product.description} </p>
                                                )} */}
                                            </div>
                                        </div>
                                        <div className=" text-black text-center ms-19">
                                            {transaction.payment_type === "qris" && transaction.status === "pending" && (
                                                <div>
                                                    <p>Metode Pembayaran: <br /> Qris</p>
                                                    <button onClick={() => onPay(transaction)}>Bayar Sekarang</button>
                                                    
                                                </div>
                                            )}

                                            {transaction.payment_type === "bank_transfer" && transaction.payment_detail?.va_number && (
                                                <div>
                                                    <p>Metode Pembayaran: <br /> Virtual Account</p>
                                                    <p>Nomor VA: <br /> {transaction.payment_detail.va_number}</p>
                                                    <p>{transaction.payment_detail.bank}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 bg-gray-50 px-5 py-5">
                                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                            <div >
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Tanggal Mulai</p>

                                                <p className="mt-1 font-semibold text-gray-700">
                                                    {moment(transaction.rental_duration.start_date).format("DD MMMM YYYY")}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    Tanggal Selesai
                                                </p>

                                                <p className="mt-1 font-semibold text-gray-700">
                                                    {moment(transaction.rental_duration.end_date).format("DD MMMM YYYY")}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    Durasi Sewa
                                                </p>

                                                <p className="mt-1 font-semibold text-gray-700">
                                                    {duration} Hari
                                                </p> 
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-700">
                                                    Total Pembayaran
                                                </p>

                                                <p className="mt-1 font-bold text-gray-800">
                                                    {formatIDR(transaction.gross_amount)}
                                                </p>
                                            </div>
                                        </div>   
                                    </div>
                                    <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Dibuat pada:
                                            </p>

                                            <p className="text-sm font-medium text-gray-600">
                                                {moment(transaction.created_at).format("DD MMMM YYYY, HH:mm")}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}