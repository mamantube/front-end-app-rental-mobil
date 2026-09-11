/* eslint-disable react/prop-types */
import EmptyProduct from "../../EmptyProduct";
import { useNavigate } from "react-router-dom";
import CardProduct from "../../CardProduct";

export default function ListProduct({ dataProduct = [] }) {
  const navigateTo = useNavigate();

  const goToEdit = (_id) => {
    navigateTo(`/admin/data-mobil/edit/${_id}`);
  };

  if (!dataProduct.length) {
    return <EmptyProduct />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {dataProduct.map((detailProduct, index) => (
          <CardProduct
            key={`card-product-${index + 1}`}
            product={detailProduct}
            onClickBtnCard={() => goToEdit(detailProduct._id)}
          />
        ))}
      </div>
    </section>
  );
}
