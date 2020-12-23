import Banners from "./Banners"
import Content from "./Content"
import Categories from "./Categories"
import "./home.css"
import { getDataByApi } from "../../app/dataRequest"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Home() {
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const [isProductsFetched, setIsProductsFetched] = useState(false)
    const cartItems = useSelector((state) => state.cart.items)

    useEffect(() => {
        getBanners()
        getProducts()
    }, [])

    useEffect(() => {
        syncProductsQtyWith(products, cartItems)
    }, [cartItems, isProductsFetched])

    async function getBanners() {
        const response = await getDataByApi("banners")
        const banners = response.data
        setBanners(banners)
    }

    async function getProducts() {
        const response = await getDataByApi("products")
        const products = response.data
        syncProductsQtyWith(products, cartItems)
        setIsProductsFetched(true)
    }

    function syncProductsQtyWith(products, cartItems) {
        const upDatedProducts = products.map((product) => {
            const match = cartItems.find((item) => item.id === product.id)
            const updatedProduct = match ? match : { ...product, qty: 0 }
            return updatedProduct
        })
        setProducts(upDatedProducts)
    }

    return (
        <main className="home-wraper outter-wraper d-flex flex-column align-items-center row">
            <Banners data={banners}></Banners>
            <Categories></Categories>
            <Content products={products} setProducts={setProducts}></Content>
        </main>
    )
}
