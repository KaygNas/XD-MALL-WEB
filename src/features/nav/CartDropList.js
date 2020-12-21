import ProductsList from "../common/ProductsList"
import ActionsBar from "../common/ActionsBar"
import "./nav.css"
import { getDataByApi } from "../../app/dataRequest"
import { useEffect, useState } from "react"
import { useNavTo } from "../../app/hooks"

export default function CartDropList() {
    const [cart, setCart] = useState(null)
    const navTo = useNavTo()

    useEffect(() => {
        getCart()
    }, [])

    async function getCart() {
        const cart = (await getDataByApi("cart")).data
        setCart(cart)
    }

    return (
        <div className="cart-drop-list-wraper drop-list">
            <div className="cart-drop-list">
                {renderProductsListFromArray(cart && cart.items)}
            </div>
            <ActionsBar
                btnText="去下单"
                btnAction={() => navTo("/settle")}
                total={cart ? cart.total : 0}
            ></ActionsBar>
        </div>
    )
}

export function renderProductsListFromArray(items) {
    return (
        items &&
        items.map((item) => (
            <ProductsList key={item.id} item={item}></ProductsList>
        ))
    )
}
