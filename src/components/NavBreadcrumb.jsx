import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavBreadcrumb( { navList = [] }) {
    const navigateTo = useNavigate();

    const onNavigateTo = (url) => {
        navigateTo(url);
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mt-2">
                {navList.map((item, index) => {
                    const { to, title, isActive } = item;

                    return (
                        <li key={`nav-item-${index + 1}`} className="flex items-center">
                            {index !== 0 && (
                                <ChevronRight size={16} className="mx-2 text-gray-400" />
                            )}

                            {isActive ? (
                                <span className="font-semibold text-gray-900 cursor-defauld">{ title }</span>
                            ) : (
                                <button type="button" onClick={onNavigateTo} className="transition-colors hover:text-blue-600 hover:underline">
                                    { title }
                                </button>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

// /* eslint-disable react/prop-types */
// import { Breadcrumb } from "react-bootstrap";
// import "../assets/CSS/NavBreadcrumb.css";
// import { useNavigate } from "react-router-dom";

// export default function NavBreadcrumb({ navList = []}) {
//     const navigateTo = useNavigate()
    
//     const onNavigateTo = (url) => {
//         navigateTo(url)
//     }

//     const generateItemBreadcrumb = (data, index) => {
//         let {to, title, isActive} = data;

//         if (isActive) {
//             return (
//                 <Breadcrumb.Item key={`nav-item-${index + 1}`} active >
//                     {title}
//                 </Breadcrumb.Item>
//             );
//         }

//         return (
//             <Breadcrumb.Item key={`nav-item-${index + 1}`} onClick={() => onNavigateTo(to)} >
//                 {title}
//             </Breadcrumb.Item>
//         )

//     }

//     return (
//         <Breadcrumb id="nav--breadcrumb" className="custom--breadcrumb">
//             {navList.map((item, index) => generateItemBreadcrumb(item, index))}
//         </Breadcrumb>
//     )
// }