/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EmptyProduct from "../EmptyProduct";
import CardProduct from "../CardProduct";

export default function ListProductCust({ dataProduct = [] }) {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token")
  function productbtnCard(_id) {
    if (token) {
      navigateTo(`/customer/rental-customer/detail-produk/${_id}`)
    } else {
      navigateTo("/login")
    } 
  }

  if (!dataProduct.length) return <EmptyProduct />;
  return (
    <div>
      <Row className=" g-3 my-5">
        {dataProduct.map((detailProduct, index) => (
          <Col key={`card-product-${index + 1}`} lg="3">
            <CardProduct
              product={detailProduct}
              onClickBtnCard={() => productbtnCard(detailProduct._id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
