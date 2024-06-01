/* eslint-disable react/prop-types */
import moment from "moment";
import { Card, Row, Col, Form, Button } from "react-bootstrap";

export default function SearchProduct(props) {
  let { q, start_date, end_date, onChangeValue, onClickSearch } = props;

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
                type="date"
                placeholder="Tanggal mulai sewa"
                className=" rounded-0 bg-light"
                name="start_date"
                value={start_date}
                onChange={(e) => onChangeValue(e)}
                min={moment().format("YYYY-MM-DD")}
              />
            </Col>

            <Col lg="2" md="3" sm="4" className=" mt-lg-0 mt-3 mt-md-0">
              <Form.Control
                type="date"
                placeholder="Tanggal selesai sewa"
                className=" rounded-0 bg-light"
                name="end_date"
                value={end_date}
                onChange={(e) => onChangeValue(e)}
                min={moment().format("YYYY-MM-DD")}
              />
            </Col>

            <Col lg="2" md="12" sm="4" className=" mt-md-3 mt-lg-0 mt-3">
              <Button
                variant="dark"
                className=" rounded-0 w-100"
                onClick={onClickSearch}
              >
                <i className="bi bi-search"></i> Cari mobil
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
