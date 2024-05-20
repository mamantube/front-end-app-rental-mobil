import NavBreadcrumb from "../../../components/NavBreadcrumb";
import ProdukForm from "../../../components/admin/data-mobil/ProdukFrom";


let navList = [
    {
        to:"/admin/data-mobil",
        title: "Data Mobil",
        isActive: false,
    },
    {
        to:"/admin/data-mobil/buat-baru",
        title: "Buat Baru",
        isActive: true,
    },
]

export default function BuatBaru () {
    return (
        <section id="buat--baru">
            <NavBreadcrumb navList={navList} />

            <ProdukForm />
        </section>
    )
} 