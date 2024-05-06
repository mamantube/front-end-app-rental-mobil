import NavBreadcrumb from "../../../components/NavBreadcrumb"

export default function DataMobil () {
    let navList = [
        {
            to:"/",
            title: "Data Mobil",
            isActive: false
        },
        {
            to:"/admin/data-pengguna",
            title: "Data Pengguna",
            isActive: false,
        }
    ]
    return (
        <section id="list--data--mobil" className=" min-vh-100">
            <NavBreadcrumb navList={navList} />
            <h2>Data Mobil Maman Rental Mobil</h2>
        </section>
    )
}