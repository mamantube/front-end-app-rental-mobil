import { Spinner } from "react-bootstrap";
import "../assets/CSS/Loading.css";

export default function Loading() {
    return (
        <main id="loading__overlay">
            <Spinner animation="border" />
        </main>
    )
}