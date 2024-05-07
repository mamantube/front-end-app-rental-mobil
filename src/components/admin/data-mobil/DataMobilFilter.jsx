/* eslint-disable react/prop-types */
import { Card, Row, Col, Form, Button } from "react-bootstrap"

export default function DataMobilFilter(props)  {
    let {q, onChangeValue, sort_by, onClickSearch, onCreateNew} = props
    return (
        <>
            <Card className=" rounded-0 shadow-sm">
                <Card.Body>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <Form.Control type="text" placeholder="Toyota Avanza" className=" rounded-0 bg-light" name="q" value={q} onChange={(e) => onChangeValue(e)}/>
                        </Col>

                        <Col lg="2" md="3" sm="4" className=" mt-3 mt-md-0">
                            <Form.Select name="sort_by" value={sort_by} onChange={(e) => onChangeValue(e)} className=" rounded-0 bg-light" >
                                <option>Urutkan Data</option>
                                <option value="asc">Data Baru</option>
                                <option value="desc">Data Lama</option>
                            </Form.Select>
                        </Col>

                        <Col lg="2" md="3" sm="4" className=" mt-lg-0 mt-3 mt-md-0">
                            <Button variant="outline-dark" className=" rounded-0 w-100">
                                <i className="bi bi-search" onClick={onClickSearch}></i> Cari Mobil
                            </Button>
                        </Col>

                        <Col lg="2" md="12" sm="4" className=" mt-md-3 mt-lg-0 mt-3" >
                            <Button variant="dark" className=" rounded-0 w-100" onClick={onCreateNew}>
                                <i className="bi bi-pencil-fill"></i> Buat Baru
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}