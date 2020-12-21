import Banners from "./Banners"
import Content from "./Content"
import Categories from "./Categories"
import "./home.css"
import { getData } from "../../app/dataRequest"
import { useEffect, useState } from "react"

export default function Home() {
    const [banners, setBanners] = useState([])

    useEffect(() => {
        getBanners()
    }, [])

    async function getBanners() {
        const response = await (await getData("banners")).json()
        const banners = response.data
        setBanners(banners)
    }

    return (
        <main className="home-wraper outter-wraper d-flex flex-column align-items-center row">
            <Banners data={banners}></Banners>
            <Categories></Categories>
            <Content></Content>
        </main>
    )
}
