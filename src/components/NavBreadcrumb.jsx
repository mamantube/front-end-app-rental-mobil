/* eslint-disable react/prop-types */
import { Breadcrumb } from "react-bootstrap";
import "../assets/CSS/NavBreadcrumb.css";
import { useNavigate } from "react-router-dom";

export default function NavBreadcrumb({ navList = []}) {
    const navigateTo = useNavigate()
    
    const onNavigateTo = (url) => {
        navigateTo(url)
    }

    const generateItemBreadcrumb = (data, index) => {
        let {to, title, isActive} = data;

        if (isActive) {
            return (
                <Breadcrumb.Item key={`nav-item-${index + 1}`} active >
                    {title}
                </Breadcrumb.Item>
            );
        }

        return (
            <Breadcrumb.Item key={`nav-item-${index + 1}`} onClick={() => onNavigateTo(to)} >
                {title}
            </Breadcrumb.Item>
        )

    }

    return (
        <Breadcrumb id="nav--breadcrumb" className="custom--breadcrumb">
            {navList.map((item, index) => generateItemBreadcrumb(item, index))}
        </Breadcrumb>
    )
}