import { formatIDR } from "../utils/formater";
import { useLocation } from "react-router-dom";
import {} from "lucide-react";

export default function CardProduct(props) {
  const {
    product = {},
    buttonText = "Book Now",
    onClickBtnCard = () => {},
  } = props;

  const location = useLocation();
  const customerCardBtn = location.pathname.includes("/admin");
  const finalButtonText = customerCardBtn ? "Edit" : buttonText;

  return (
    <>
      <div className="group overflow-hidden border rounded-2xl bg-white shadow-md transition-all duration-150 hover:translate-y-2 hover:shadow-2xl">
        <div className="relative overflow-hidden">
          <img
            src={product.storage_detail.secure_url}
            alt={product.name}
            className="h-50 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>
        <div className="space-y-4 p-5">
          <h3 className="text-xl font-bold"> { product.name} </h3>
        </div>
        <div className="flex items-center justify-between border-t pt-4 px-2">
          <div>
            <p className="text-sm text-gray-500">Mulai dari</p>
            <h2 className="text-2xl font-bold text-blue-600">{ formatIDR(product.price)}</h2>
            <span className="text-sm text-gray-500">/hari</span>
          </div>
            <button className="rounded-xl cursor-pointer bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700" onClick={onClickBtnCard}>{finalButtonText}</button>
        </div>
      </div>
    </>
  );
}

// /* eslint-disable react/prop-types */
// import { formatIDR } from "../utils/formater";
// import { useLocation } from "react-router-dom";

// export default function CardProduct(props) {
//   const {
//     product = {},
//     buttonText = "Sewa mobil",
//     onClickBtnCard = () => {},
//   } = props;

//   const styleImg = {
//     objectFit: "contain",
//     aspectRatio: "1/1",
//     objectPosition: "center",
//     opacity: product.deleted_at ? "0.4" : "1"
//   };

//   const location = useLocation()

//   const customerCardBtn = location.pathname.includes("/admin")
//   const finalButtonText = customerCardBtn ? "Edit" : buttonText

//   let element

//   if (product && product.deleted_at) {
//     element = (
//       <div className=" position-relative d-flex justify-content-center align-items-center">
//         <Card.Text className=" position-absolute">
//             Kendaraan dalam perbaikan
//         </Card.Text>
//         <Card.Img variant="top" src={product.storage_detail.secure_url} style={styleImg} />
//       </div>
//     );
//   } else {
//     element = (
//       <Card.Img
//         variant="top"
//         src={product.storage_detail.secure_url}
//         className=" rounded-0"
//         style={styleImg}
//       />
//     )
//   }
//   return (
//     <Card className=" rounded-0 h-100 shadow">
//       {element}

//       <Card.Body className=" text-center">
//         <Card.Title>{product.name}</Card.Title>
//         <Card.Text>{formatIDR(product.price)}</Card.Text>

//         <Button
//           variant="dark"
//           className=" rounded-0 w-50"
//           onClick={onClickBtnCard}
//         >
//           {finalButtonText}
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }
