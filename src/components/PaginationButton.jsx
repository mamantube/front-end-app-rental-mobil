import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationButton( props ) {
    const { dataProduct = [], currentPage = 1, totalPage = 1, onPage = () => {}} = props;

    if (!dataProduct.length) return null;

    const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
    return (
        <div className="mt-8 flex items-center justify-center mb-8">
            <nav className="flex items-center gap-2">
                <button type="button" disabled={currentPage === 1} onClick={() => onPage(currentPage - 1)} className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${currentPage === 1 ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100" }`}>
                    <ChevronLeft size={18} />
                </button>

                {pages.map((page) => (
                    <button key={page} type="button" onClick={() => onPage(page)} className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition ${currentPage === page ? "border-gray-900 text-white bg-gray-900" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"}`}>
                        {page}
                    </button>
                ))}

                <button type="button" disabled={currentPage === totalPage} onClick={() => onPage(currentPage + 1)} className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${currentPage === totalPage ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"}`}>
                    <ChevronRight size={18} />
                </button>
            </nav>
            
        </div>
    )
}

/* eslint-disable react/prop-types */
// import { Pagination } from "react-bootstrap";
// import "../assets/CSS/PaginationButton.css"

// export default function PaginationButton(props) {
//   const {
//     dataProduct = [],
//     currentPage = 1,
//     totalPage = 3,
//     onPage = () => {},
//   } = props;

//   let arrayPaginationBtn = [...Array(totalPage)];

//   if (!dataProduct.length) return;
//   return (
//     <div className=" d-flex justify-content-center align-items-center btn--pagination">
//         <Pagination>
//             <Pagination.Prev
//                 disabled={currentPage === 1}
//                 onClick={() => onPage(currentPage - 1)}
//             />
//             {arrayPaginationBtn.map((_, page) => (
//                 <Pagination.Item key={`item-page-${page + 1}`} className=" mx-1" active={page + 1 === currentPage} onClick={() => onPage(page + 1)}>
//                     {page + 1}
//                 </Pagination.Item>
//             ))}
//             <Pagination.Next disabled={currentPage === totalPage} onClick={() => onPage(currentPage + 1)}/>
//         </Pagination>
//     </div>
    
//   );
// }
