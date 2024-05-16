/* eslint-disable react/prop-types */
import { Row, Col, } from "react-bootstrap";
import EmptyProduct from "../../EmptyProduct";
import CardProduct from "../../CardProduct";


export default function ListProduct({dataProduct = []}) {
    const divStyle = {
        margin: "2.875rem 0"}
    if (!dataProduct.length) return  <EmptyProduct />

    const onEditProduct = (product) => {
        console.log("ini", product)
    }
    return (
        <div style={divStyle}>
            <Row>
                {dataProduct.map((product, index) => (
                    <Col key={`card-product-${index + 1}`} lg="3" >
                        <CardProduct product={product} onClickBtnCard={() => onEditProduct(product)}/>      
                    </Col>
                ))}
            </Row>
        </div>
    )
}