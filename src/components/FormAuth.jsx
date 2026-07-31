export default function FormAuth( props ) {
    let { children, title = "judul", subTitle = "sub judul"} = props;

    return (
        <div className="card w-96 bg-base-100 shadow-lg border border-gray-700">
            <div className="card-body bg-amber-50 rounded-lg">
                <div className="card-title text-center text-gray-700 text-xl">
                    {title}
                </div>
                <div className="text-xs text-gray-700">
                    {subTitle}
                </div>
                {children}
            </div>
        </div>
    )

}

// /* eslint-disable react/prop-types */
// import { Card } from "react-bootstrap";
// import "../assets/CSS/FormAuth.css";

// export default function FormAuth (props) {
//     let { children, title = "judul", subTitle = "Sub Judul"} = props;
//     return (
//         <Card id="card__form__auth" className="shadow-sm">
//             <Card.Body className="body__form">
//                 <Card.Title className=" text-center text-dark text-h3 title__form">
//                     {title}
//                 </Card.Title>
//                 <Card.Subtitle className="text-p4 text-dark subtitle__form">
//                     {subTitle}
//                 </Card.Subtitle>


//                 {children}
//             </Card.Body>
//         </Card>
//     )
// }