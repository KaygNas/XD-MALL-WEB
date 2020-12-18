import ProductsList from "../common/ProductsList"
import ActionsBar from "../common/ActionsBar"
import "./nav.css"

export default function CartDropList() {
    return (
        <div className="cart-drop-list-wraper drop-list">
            <div className="cart-drop-list">
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
            </div>
            <ActionsBar></ActionsBar>
        </div>
    )
}

