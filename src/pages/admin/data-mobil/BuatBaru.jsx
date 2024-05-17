import NavBreadcrumb from "../../../components/NavBreadcrumb";


let navList = [
    {
        to:"/",
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
        </section>
    )
} 