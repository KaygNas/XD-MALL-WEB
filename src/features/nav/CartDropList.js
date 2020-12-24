import ProductsList from "../common/ProductsList"
import ActionsBar from "../common/ActionsBar"
import "./nav.css"
import { useNavTo } from "../../app/hooks"

export default function CartDropList({ cart, showCartList }) {
    const navTo = useNavTo()
    const listItems = Object.values(cart.items.entities)

    return (
        <div
            className={`cart-drop-list-wraper drop-list ${
                showCartList ? "animation--show" : "animation--hide"
            }`}
        >
            <div className="cart-drop-list">
                <ProductsList items={listItems}></ProductsList>
            </div>
            <ActionsBar
                btnText="去下单"
                btnAction={() => navTo("/settle")}
                total={cart ? cart.total : 0}
            ></ActionsBar>
        </div>
    )
}
