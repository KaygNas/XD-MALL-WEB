import ProductsList from "../common/ProductsList"
import ActionsBar from "../common/ActionsBar"
import "./nav.css"
import { useNavTo } from "../../app/hooks"

export default function CartDropList({ cart }) {
    const navTo = useNavTo()

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
