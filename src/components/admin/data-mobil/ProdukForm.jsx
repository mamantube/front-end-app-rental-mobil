/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { X, RotateCcw, Upload, Crop } from "lucide-react";
import getCroppedImg from "../../../utils/cropImage.js";

export default function ProdukForm(props) {
  const {
    isEdit = false,
    dataProduct = null,
    onSubmitForm = () => {},
    children,
  } = props;
  const [srcImage, setSrcImage] = useState(null);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const refInputFile = useRef(null);

  const schemaValidation = Yup.object({
    name: Yup.string()
      .required("Nama mobil tidak boleh kosong")
      .max(25, "Maximal 20 Karakter")
      .trim(),
    price: Yup.number()
      .required("Harga produk tidak bolh kosong")
      .integer("Harga tidak boleh bilangan desimal")
      .positive("Harga Tidak boleh negatif"),
    description: Yup.string()
      .required("Deskripsi tidak boleh kosong")
      .min(20, "Minimal 20 Karakter")
      .max(250, "Maximal 250 karakter")
      .trim(),
    image: isEdit
      ? Yup.mixed().nullable()
      : Yup.mixed().required("Foto tidak boleh kosong"),
  });

  const initialForm = {
    name: "",
    price: 0,
    description: "",
    image: null,
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schemaValidation,
    onSubmit: (values) => {
      onSubmitForm(values);
    },
  });

  const handleChangeImg = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Format gambar harus JPEG, JPG, PNG atau WEBP");

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB");

      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setSrcImage(imageUrl);

    setShowCropper(true);

    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);

    Formik.setFieldTouched("image", true);
  };

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropImage = async () => {
    try {
      if (!srcImage || !croppedAreaPixels) return;

      const croppedBlob = await getCroppedImg(srcImage, croppedAreaPixels);

      const croppedFile = new File([croppedBlob], "product-image.jpg", {
        type: "image/jpeg",
      });

      Formik.setFieldValue("image", croppedFile);

      const previewUrl = URL.createObjectURL(croppedBlob);

      setSrcImage(previewUrl);

      setShowCropper(false);
    } catch (error) {
      console.error("CROP IMAGE ERROR", error);
      alert("Gagal melakukan crop gambar");
    }
  };

  const onResetForm = () => {
    if (refInputFile.current) {
      refInputFile.current.value = "";
    }

    let urlImage = null;

    if (isEdit && dataProduct?.storage_detail?.secure_url) {
      urlImage = dataProduct.storage_detail.secure_url;
    }

    setSrcImage(urlImage);

    setShowCropper(false);

    Formik.resetForm({
      values: initialForm,
      touched: {},
    });

    if (urlImage) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isEdit && dataProduct) {
      Formik.setValues({
        name: dataProduct.name || "",
        price: dataProduct.price || "",
        description: dataProduct.description || "",
        image: null,
      });

      setSrcImage(dataProduct.storage_detail?.secure_url || null);
    }
  }, [isEdit, dataProduct]);

  const disableSubmitBtn =
    isEdit && dataProduct ? dataProduct.deleted_at : false;

  const labelBtn = isEdit ? "Perbaharui data" : "Buat data baru";

  return (
    <>
      <div className="mx-auto mt-6 w-full max-w-6xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={Formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Foto Mobil
            </label>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <div className="aspect-4/3 w-full">
                <img
                  src={srcImage || "/img/placeholder.png"}
                  alt="Product image"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {Formik.values.image && (
              <p className="mt-2 text-xs text-gray-500">
                Gambar sudah berhasil dicrop.
              </p>
            )}
          </div>

          <div className="mb-6 mt-4">
            <label
              htmlFor="product-image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Upload Foto
            </label>

            <div className="relative">
              <input
                type="file"
                ref={refInputFile}
                id="product-image"
                name="image"
                onChange={handleChangeImg}
                accept=".jpg,.jpeg,.png,.webp"
                className="w-full block cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              JPG, JPEG, PNG, WEBP • Maksimal 5MB
            </p>

            {Formik.errors.image && Formik.touched.image && (
              <p className="mt-1 text-sm text-red-500">{Formik.errors.image}</p>
            )}
          </div>

          <div className="md:col-span-8">
            <div className="mb-5">
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama Mobil
              </label>

              <input
                type="text"
                name="name"
                id="product-name"
                placeholder="Masukkan Nama Mobil..."
                value={Formik.values.name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                autoComplete="off"
                className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition text-black ${Formik.errors.name && Formik.touched.name ? "border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-300 focus:border-gray-900 foucs:ring-2 focus:ring-gray-100"}`}
              />

              {Formik.errors.name && Formik.touched.name && (
                <p className="mt-1 text-sm text-red-500"></p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="product-price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Harga Sewa / Hari
              </label>

              <input
                type="number"
                name="price"
                id="procut-pricce"
                placeholder="Masukkan Harga Sewa"
                value={Formik.values.price}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                autoComplete="off"
                className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition text-black ${Formik.errors.price && Formik.touched.price ? "border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-100"}`}
              />

              {Formik.errors.price && Formik.touched.name && (
                <p className="mt-1 text-sm text-red-500">
                  {Formik.errors.price}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="product-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Descripsi Mobil
              </label>

              <textarea
                name="description"
                id="product-description"
                rows={5}
                placeholder="Masukkan descripsi mobil"
                value={Formik.values.description}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-black outline-none transition ${Formik.errors.description && Formik.touched.description ? "border-red-500 focus-ring-2 focus:ring-red-100" : "border-gray-300 focus:ring-2 focus:ring-gray-100"}`}
              ></textarea>

              <div className="mt-1 flex justify-between">
                <div>
                  {Formik.errors.description && Formik.touched.description && (
                    <p className="text-sm text-red-500">
                      {Formik.errors.description}
                    </p>
                  )}
                </div>

                <span className="text-xs text-gray-400">
                  {Formik.values.description.length}/250
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onResetForm}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <RotateCcw />
                Reset
              </button>

              {children}

              <button
                type="submit"
                disabled={disableSubmitBtn}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isEdit ? <Crop size={16} /> : <Upload size={16} />}

                {labelBtn}
              </button>
            </div>
          </div>
        </form>
      </div>

      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0">
          <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Crop Foto Mobil
                </h3>

                <p className="text-sm text-gray-500">Sesuaikan posisi foto</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCropper(false);
                  if (refInputFile.current) {
                    refInputFile.current.value = "";
                  }
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative h-100 w-full bg-gray-950">
              <Cropper
                image={srcImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center px-4">
                <span className="text-sm font-medium text-gray-600">Zoom</span>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="w-full"
                />

                <span className="w-10 text-right text-sm text-gray-500">
                  {zoom.toFixed(1)}X
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setShowCropper(false);
                  if (refInputFile.current) {
                    refInputFile.current.value = "";
                  }
                }}
                className="rounded-lg border border-white-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleCropImage}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Crop size={16} />
                Gunakan Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
