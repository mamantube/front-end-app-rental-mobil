/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";
import { formatIDR } from "../utils/formater";

export default function CardProduct(props) {
  const {
    product = {},
    buttonText = "Edit",
    onClickBtnCard = () => {},
  } = props;

  const styleImg = {
    objectFit: "contain",
    aspectRatio: "1/1",
    objectPosition: "center",
  };
  return (
    <Card className=" rounded-0 h-100 shadow">
      <Card.Img
        variant="top"
        src={product.storage_detail.secure_url}
        className=" rounded-0"
        style={styleImg}
      />
      <Card.Body className=" text-center">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{formatIDR(product.price)}</Card.Text>

        <Button
          variant="dark"
          className=" rounded-0 w-50"
          onClick={onClickBtnCard}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}
