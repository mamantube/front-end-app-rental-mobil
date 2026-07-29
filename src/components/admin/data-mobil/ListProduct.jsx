import EmptyProduct from "../../EmptyProduct";
import { useNavigate } from "react-router-dom";
import CardProduct from "../../CardProduct";

export default function ListProduct( dataProduct = []) {
    const navigateTo = useNavigate();

    const goToEdit = (_id) => {
        navigateTo(`/admin/data-mobil/edit/${_id}`)
    }

    if (!dataProduct.length) return <EmptyProduct />;

    return (
        <section>
            {dataProduct.map((detailProduct, index) => (
                <CardProduct
                    key={`card-product-${index + 1}`}
                    product={detailProduct}
                    onClickBtnCard={() => goToEdit(detailProduct._id)}
                />
            ))}
        </section>
    )
}

// /* eslint-disable react/prop-types */
// import { Row, Col } from "react-bootstrap";
// import EmptyProduct from "../../EmptyProduct";
// import CardProduct from "../../CardProduct";
// import { useNavigate } from "react-router-dom";

// export default function ListProduct({ dataProduct = [] }) {
//   const navigateTo = useNavigate();

//   function goToEdit(_id) {
//     navigateTo(`/admin/data-mobil/edit/${_id}`)
//   }

//   const divStyle = {
//     margin: "2.875rem 0",
//   };
//   if (!dataProduct.length) return <EmptyProduct />;
//   return (
//     <div style={divStyle}>
//       <Row className=" g-3">
//         {dataProduct.map((detailProduct, index) => (
//           <Col key={`card-product-${index + 1}`} lg="3">
//             <CardProduct
//               product={detailProduct}
//               onClickBtnCard={() => goToEdit(detailProduct._id) }
//             />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }
