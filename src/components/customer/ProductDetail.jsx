/* eslint-disable react/prop-types */
import { Row, Col, Button, Form, } from "react-bootstrap";
import { formatIDR } from "../../utils/formater";
import moment from "moment";

export default function ProductDetail(props) {
  const { dataProduct, onChangeValue, start_date, end_date } = props;

  const styleImg = {
    height: "260.5px",
    width: "100%",
    objectFit: "contain",
    opjectPosition: "center",
    border: "1px solid #ccc",
  };
  return (
    <Row md="4" sm="12" className=" ">
      <Col>
        <img
          src={dataProduct.storage_detail?.secure_url}
          alt=""
          style={styleImg}
        />
      </Col>
      <Col md="9" sm="12" className=" p-16">
        <Row className=" mb-2 border-bottom">
          <Col>
            <p className=" text-h3">{dataProduct.name}</p>
            <p>{formatIDR(dataProduct.price)}</p>
          </Col>
        </Row>
        <Row className=" mb-2 border-bottom">
          <Col>
            <p>{dataProduct.description}</p>
          </Col>
        </Row>
        <Row className=" mb-2">
          <Col>
            <p className="text-h4">Informasi Penting</p>
            <p className="text-h6">Setelah anda pesan</p>
            <ul>
                <li>Penyedia akan menghubungi pengemudi melalui WhatsApp untuk meminta foto beberapa dokumen wajib</li>
            </ul>
            <p className="text-h6">Saat Pengambilan</p>
            <ul>
                <li>Bawa KTP, SIM A, dan dokumen-dokumen lain yang dibutuhkan oleh penyedia rental.</li>
                <li>Tunjukan bukti pemesanan pelunasan sewa.</li>
                <li>Saat Anda bertemu dengan staf rental, cek kondisi mobil dengan staf.</li>
                <li>Setelah itu, baca dan tanda tangan perjanjian rental.</li>
            </ul>
            <p className="text-h6">Kebijakan refund &  Perubahan jadwal sewa</p>
            <ul>
                <li>Mengenai pengembalian dana/perubahan jadwal dapat dilakukan minimal 24 jam sebelum waktu sewa dilakukan.</li>
                <li>Apabila telah memasuki waktu atau durasi penyewaan maka akan kami anggap tidak dapat direfund kembali.</li>
                <li>Perihal pengembalian dana (refund) dapat menghubungi pihak rental dengan syarat ketentuan yang berlaku.</li>
                <li>Perubahan jadwal sewa dapat melakukan dengan klik ubah jadwal sewa di menu Daftar Sewa.</li>
            </ul>
          </Col>
        </Row>
        <Row className=" mb-2">
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
            >
               Sewa Mobil
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
