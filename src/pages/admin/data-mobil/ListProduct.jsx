import { Card } from "react-bootstrap";
import EmptyProduct from "../../../components/EmptyProduct";


export default function ListProduct(dataProduct = []) {
    if (!dataProduct.length) return  <EmptyProduct />
    return (
        <div>
            {dataProduct.map((product, index) => (
                <Card key={`card-product-${index + 1}`}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        {JSON.stringify(product)}
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}