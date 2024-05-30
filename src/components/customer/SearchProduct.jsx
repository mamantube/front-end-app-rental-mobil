/* eslint-disable react/prop-types */
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";


export default function SearchProduct(props) {
  let { q, onChangeValue, onClickSearch } = props;
  const location = useLocation()
  

  

  const disableForm = location.pathname.includes("/data-transaksi") ? false : true

  return (
    <>
      <Card className=" rounded-0 shadow-sm">
        <Card.Body>
          <Row>
            <Col lg="6" md="6" sm="12">
              <Form.Control
                type="text"
                placeholder="Toyota Avanza"
                className=" rounded-0 bg-light"
                name="q"
                value={q}
                onChange={(e) => onChangeValue(e)}
              />
            </Col>

            <Col lg="2" md="3" sm="4" className=" mt-3 mt-md-0">
              <Form.Control
                type="text"
                placeholder="Tanggal mulai sewa"
                className=" rounded-0 bg-light"
                disabled={disableForm}
                readOnly
              />
            </Col>

            <Col lg="2" md="3" sm="4" className=" mt-lg-0 mt-3 mt-md-0">
              <Form.Control
                type="text"
                placeholder="Tanggal selesai sewa"
                className=" rounded-0 bg-light"
                disabled={disableForm}
              />
            </Col>

            <Col lg="2" md="12" sm="4" className=" mt-md-3 mt-lg-0 mt-3">
              <Button variant="dark" className=" rounded-0 w-100" onClick={onClickSearch}>
                <i className="bi bi-search"></i> Cari mobil
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
