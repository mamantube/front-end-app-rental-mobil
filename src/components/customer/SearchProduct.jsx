  import { Search } from "lucide-react";
  import moment from "moment";


  export default function SearchProduct( props ) {
    let { q, start_date, end_date, onChangeValue, onClickSearch } = props;

    return (
      <div className="flex justify-center items-center rounded-lg bg-white shadow-sm border border-gray-200 p-6 mt-8 w-3xl">
        <div className="flex flex-row gap-4 md:grid-col-12 justify-center items-center">
          <div className="md:col-span-6">
            <input type="text" name="q" value={q} onChange={onChangeValue} autoComplete="off" placeholder="Cari kendaraan..." className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:bg-white" />
          </div>

        <div className="md:col-span-2">
          <input
            type="date"
            name="start_date"
            value={start_date}
            onChange={onChangeValue}
            min={moment().format("YYYY-MM-DD")}
            placeholder="pilih mulai tanggal sewa"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <input
            type="date"
            name="end_date"
            value={end_date}
            onChange={onChangeValue}
            min={moment().format("YYYY-MM-DD")}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <button
            onClick={onClickSearch}
            className="flex h-full w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-white transition hover:bg-black active:scale-[0.98]"
          >
            <Search size={18} />
            <span>Cari Mobil</span>
          </button>
        </div>
      </div>

    </div>
  )
}

// /* eslint-disable react/prop-types */
// import moment from "moment";
// import { Card, Row, Col, Form, Button } from "react-bootstrap";

// export default function SearchProduct(props) {
//   let { q, start_date, end_date, onChangeValue, onClickSearch } = props;

//   return (
//     <>
//       <Card className=" rounded-0 shadow-sm">
//         <Card.Body>
//           <Row>
//             <Col lg="6" md="6" sm="12">
//               <Form.Control
//                 type="text"
//                 placeholder="Toyota Avanza"
//                 className=" rounded-0 bg-light"
//                 name="q"
//                 value={q}
//                 onChange={(e) => onChangeValue(e)}
//                 autoComplete="off"
//               />
//             </Col>

//             <Col lg="2" md="3" sm="4" className=" mt-3 mt-md-0">
//               <Form.Control
//                 type="date"
//                 placeholder="Tanggal mulai sewa"
//                 className=" rounded-0 bg-light"
//                 name="start_date"
//                 value={start_date}
//                 onChange={(e) => onChangeValue(e)}
//                 min={moment().format("YYYY-MM-DD")}
//               />
//             </Col>

//             <Col lg="2" md="3" sm="4" className=" mt-lg-0 mt-3 mt-md-0">
//               <Form.Control
//                 type="date"
//                 placeholder="Tanggal selesai sewa"
//                 className=" rounded-0 bg-light"
//                 name="end_date"
//                 value={end_date}
//                 onChange={(e) => onChangeValue(e)}
//                 min={moment().format("YYYY-MM-DD")}
//               />
//             </Col>

//             <Col lg="2" md="12" sm="4" className=" mt-md-3 mt-lg-0 mt-3">
//               <Button
//                 variant="dark"
//                 className=" rounded-0 w-100"
//                 onClick={onClickSearch}
//               >
//                 <i className="bi bi-search"></i> Cari mobil
//               </Button>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }
