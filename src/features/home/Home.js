import Banners from "./Banners"
import Content from "./Content"
import Categories from "./Categories"
import "./home.css"
import { getDataByApi } from "../../app/dataRequest"
import { useEffect, useState } from "react"

import { Redirect, Route } from "react-router-dom"

export default function Home() {
    const [banners, setBanners] = useState([])

    useEffect(() => {
        getBanners()
    }, [])

    async function getBanners() {
        const response = await getDataByApi("banners")
        const banners = response.data
        setBanners(banners)
    }

    return (
        <main className="home-wraper outter-wraper d-flex flex-column align-items-center row">
            <Banners data={banners}></Banners>
            <Route path="/home/categories/:id">
                <Categories></Categories>
                <Content></Content>
            </Route>
            <Redirect to="/home/categories/1" />
        </main>
    )
}
