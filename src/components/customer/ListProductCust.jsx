/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EmptyProduct from "../EmptyProduct";
import CardProduct from "../CardProduct";

export default function ListProductCust({ dataProduct = [] }) {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token") 

  function productbtnCard() {
    if (token) {
      navigateTo("/daftar-sewa")
    } else {
      navigateTo("/login")
    } 
  }

  if (!dataProduct.length) return <EmptyProduct />;
  return (
    <div>
      <Row className=" g-3">
        {dataProduct.map((detailProduct, index) => (
          <Col key={`card-product-${index + 1}`} lg="3">
            <CardProduct
              product={detailProduct}
              onClickBtnCard={productbtnCard}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
