import ProductsList from "../common/ProductsList"

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

function ActionsBar() {
    return (
        <div className="car-drop-list__action-bar d-flex flex-row align-items-center justify-content-between">
            <span className="action-bar__total">总计：￥123.5</span>
            <button className="btn btn-warning">去下单</button>
        </div>
    )
}