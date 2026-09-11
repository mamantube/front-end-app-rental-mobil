import { useState, useEffect } from "react";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import { formatIDR } from "../../../utils/formater";

export default function DataTransaksi() {
  const [trnasactions, setTransactions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({
    q: "",
    start_date: "",
    end_date: "",
    status: "",
    page: 1,
    per_page: 10,
  });
  const { showLoading, hideLoading } = useLoading();
  const axios = useAxios();

  const onChangeParams = (event) => {
    let { name, value } = event.target;

    setParams((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const onSearchTransaction = () => {
    setParams((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const searchTransactions = async () => {
    try {
      showLoading();

      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== ""),
      );

      const response = await axios.get("/api/v1/transaction", {
        params: cleanParams,
      });

      console.log("DATA TRANSAKSI:", response.data.data);

      setTransactions(response.data.data || []);

      const total = response.data.pagination?.total || 0;
      const resultTotalPage = Math.ceil(total / params.per_page) || 0;

      setTotalPage(resultTotalPage);
    } catch (error) {
      console.error("Error, error.response?.data" || error.message);

      setTransactions([]);
      setTotalPage(0);
    } finally {
      hideLoading();
    }
  };

  const onPagePagination = (page) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  useEffect(() => {
    searchTransactions();
  }, [params.page, params.status, params.start_date, params.end_date]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "settlement":
      case "success":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "expire":
      case "expired":
        return "bg-red-100 text-red-700";

      case "cancel":
      case "deny":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="text-black">
      <div className=" text-center">
        <h2 className=" text-2xl font-semibold">
          Data Transaksi Maman Rental Mobil
        </h2>
        <p className=" mt-2">Total Halaman: {totalPage}</p>
      </div>

      <div className="mx-auto mt-8 mb-8 w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm ">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              name="q"
              value={params.q}
              onChange={onChangeParams}
              placeholder="Cari transaksi..."
              className="h-16 w-full rounded-xl border border-gray-300 bg-white px-6 text-lg text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Start Date */}
          <div className="w-full md:w-60">
            <input
              type="date"
              name="start_date"
              value={params.start_date}
              onChange={onChangeParams}
              className="h-16 w-full rounded-xl border border-gray-300 bg-white px-6 text-lg text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* End Date */}
          <div className="w-full md:w-60">
            <input
              type="date"
              name="end_date"
              value={params.end_date}
              onChange={onChangeParams}
              className="h-16 w-full rounded-xl border border-gray-300 bg-white px-6 text-lg text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={onSearchTransaction}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-7 text-lg font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
            Cari Transaksi
          </button>
        </div>
      </div>

      <div className="mt-4 px-48 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
        <label className="font-medium text-gray-700">Status transaksi:</label>

        <select
          name="status"
          value={params.status}
          onChange={onChangeParams}
          className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="settlement">Settlement</option>
          <option value="capture">Capture</option>
          <option value="expire">Expire</option>
          <option value="cancel">Cancel</option>
          <option value="deny">Deny</option>
          <option value="refund">Refund</option>
        </select>
      </div>

      <div className="mt-8 px-4 pb-8 lg:ps-24 lg:pe-14 space-y-5">
        {trnasactions.length > 0 ? (
          trnasactions.map((transaction) => (
            <div
              key={transaction._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* HEADER */}
              <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Order ID
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-gray-800">
                    {transaction.order_id}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                      transaction.status,
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
                {/* CUSTOMER */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      👤
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Customer
                      </p>

                      <h4 className="font-semibold text-gray-800">
                        Detail Customer
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400">Nama</p>

                      <p className="font-medium text-gray-700">
                        {transaction.user_detail?.first_name || "-"}{" "}
                        {transaction.user_detail?.last_name || ""}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Email</p>

                      <p className="break-all text-sm text-gray-700">
                        {transaction.user_detail?.email || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">No. Telepon</p>

                      <p className="text-sm text-gray-700">
                        {transaction.user_detail?.phone || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRODUCT */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      🚗
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Product
                      </p>

                      <h4 className="font-semibold text-gray-800">
                        Detail Produk
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {transaction.product_detail?.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-4"
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-20 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                            🚗
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800">
                            {product.name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {formatIDR(product.price)} / hari
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                      <span className="text-sm text-gray-500">Durasi sewa</span>

                      <span className="font-semibold text-gray-700">
                        {transaction.rental_days} hari
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="border-t border-gray-200 bg-gray-50/70 px-6 py-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                        💳
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          Payment
                        </p>

                        <h4 className="font-semibold text-gray-800">
                          Detail Pembayaran
                        </h4>
                      </div>
                    </div>

                    <div className="ml-0 space-y-2 text-sm">
                      <p className="text-gray-600">
                        Metode:{" "}
                        <span className="font-semibold capitalize text-gray-800">
                          {transaction.payment_type?.replace("_", " ") || "-"}
                        </span>
                      </p>

                      {/* BANK TRANSFER */}
                      {transaction.payment_type === "bank_transfer" &&
                        transaction.payment_detail && (
                          <>
                            <p className="text-gray-600">
                              Bank:{" "}
                              <span className="font-semibold uppercase text-gray-800">
                                {transaction.payment_detail.bank}
                              </span>
                            </p>

                            <p className="text-gray-600">
                              VA Number:{" "}
                              <span className="font-mono font-semibold text-gray-800">
                                {transaction.payment_detail.va_number}
                              </span>
                            </p>
                          </>
                        )}

                      {/* QRIS */}
                      {transaction.payment_type === "qris" &&
                        transaction.payment_detail && (
                          <div>
                            <p className="text-gray-600">QRIS</p>

                            {transaction.payment_detail.qr_url ? (
                              <a
                                href={transaction.payment_detail.qr_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-block font-medium text-blue-600 hover:underline"
                              >
                                Lihat QRIS
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                QRIS belum tersedia
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="border-t border-gray-200 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <p className="text-sm text-gray-500">Total Pembayaran</p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {formatIDR(transaction.gross_amount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <div className="text-4xl">📋</div>

            <h3 className="mt-3 font-semibold text-gray-700">
              Tidak ada transaksi
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Belum ada transaksi yang sesuai dengan filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
