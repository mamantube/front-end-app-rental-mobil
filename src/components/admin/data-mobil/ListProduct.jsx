/* eslint-disable react/prop-types */
import { Card, Row, Col, Button } from "react-bootstrap";
import EmptyProduct from "../../EmptyProduct";
import { formatIDR } from "../../../utils/formater.js";


export default function ListProduct({dataProduct = []}) {
    const divStyle = {
        marginTop: "2.875rem"
    }
    if (!dataProduct.length) return  <EmptyProduct />
    return (
        <div style={divStyle} className=" min-vh-100">
            <Row>
                {dataProduct.map((product, index) => (
                    <Col key={`card-product-${index + 1}`} lg="3" >
                        <Card key={`card-product-${index + 1}`} className=" rounded-0">
                            <Card.Img variant="top" src={product.storage_detail.secure_url} className=" rounded-0"/>
                            <Card.Body className=" text-center">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{formatIDR(product.price)}</Card.Text>

                                <Button variant="dark" className=" rounded-0 w-50">
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}