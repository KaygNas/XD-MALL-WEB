import PopUp from "../common/PopUp"
import {
    increaseItemQty,
    decreaseItemQty,
    changeItemQty
} from "../../app/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useState } from "react"
import { popUpItemContext } from "../../App"

export default function Content({ products }) {
    const dispatch = useDispatch()
    const setPopUpItem = useContext(popUpItemContext)

    const [showOnlyInStock, setShowOnlyInStock] = useState(false)
    const shownProducts = products.filter(
        (product) => !showOnlyInStock || product.inStock === true
    )

    function switchStateOnlyShowInStockTo() {
        setShowOnlyInStock((state) => !state)
    }

    return (
        <>
            <div className="content-wraper d-flex flex-column">
                <div className="content__header d-flex">
                    <h2 className="content__header-title mx-auto">特价商品</h2>
                    <div
                        className="content__header-filter"
                        onClick={switchStateOnlyShowInStockTo}
                    >
                        <input
                            className="content__header-filter__input"
                            type="checkbox"
                            name="checkbox__only-in-stock"
                            checked={showOnlyInStock}
                        ></input>
                        <label
                            className="content__header-filter__label"
                            for="checkbox__only-in-stock"
                        >
                            只看有货
                        </label>
                    </div>
                </div>

                <div className="content__main row">
                    {shownProducts.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            increaseQty={() => dispatch(increaseItemQty(item))}
                            decreaseQty={() => dispatch(decreaseItemQty(item))}
                            inputQty={(qty) => {
                                item.qty = qty
                                dispatch(changeItemQty(item))
                            }}
                            onClick={() => setPopUpItem(item)}
                        ></ItemCard>
                    ))}
                </div>
            </div>
        </>
    )
}

export function ItemDetailPopUp({
    item,
    increaseQty,
    decreaseQty,
    inputQty,
    onClose
}) {
    if (item) {
        return (
            <PopUp onClose={onClose}>
                <div className="item-detail-wraper d-flex flex-column align-items-center">
                    <div className="item-detail border-bottom">
                        <ItemImg
                            className="item-detail__img"
                            src={item.image.src}
                        ></ItemImg>
                        <div className="item-detail__summary border-bottom">
                            <span className="item-detail__summary__name">
                                {item.name}
                            </span>
                            <div className="item-detail__summary__price">
                                <span className="item-detail__summary__price--on-sale item__info__price--on-sale">
                                    {item.salePrice}
                                </span>
                                <span className="item-detail__summary__price--regular item__info__price--regular">
                                    {item.regularPrice}
                                </span>
                            </div>
                        </div>
                        <div className="item-detail__info d-flex flex-column">
                            <span>规格：{item.size}</span>
                        </div>
                    </div>
                    <ActionsBtton
                        increaseQty={increaseQty}
                        decreaseQty={decreaseQty}
                        inputQty={inputQty}
                        qty={item.qty || 0}
                        inStock={item.inStock}
                    ></ActionsBtton>
                </div>
            </PopUp>
        )
    } else {
        return null
    }
}

function ItemCard({ item, increaseQty, decreaseQty, inputQty, onClick }) {
    return (
        <div className="item-card-wraper col-xl-3 col-lg-4 col-md-6 ">
            <div className="item d-flex flex-column align-items-center">
                <ItemImg src={item.image.src} onClick={onClick}></ItemImg>
                <ItemInfo
                    name={item.name}
                    size={item.size}
                    regularPrice={item.regularPrice}
                    salePrice={item.salePrice}
                ></ItemInfo>
                <ActionsBtton
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    inputQty={inputQty}
                    qty={item.qty || 0}
                    inStock={item.inStock}
                ></ActionsBtton>
            </div>
        </div>
    )
}

function ItemImg({ className = "", src, onClick }) {
    return (
        <img
            className={"item__img " + className}
            alt="item_img"
            src={src}
            onClick={onClick}
        ></img>
    )
}

function ItemInfo({ name, size, regularPrice, salePrice }) {
    return (
        <div className="item__info text-center">
            <ItemInfoDetail name={name} size={size}></ItemInfoDetail>
            <ItemInfoPrice
                regularPrice={regularPrice}
                salePrice={salePrice}
            ></ItemInfoPrice>
        </div>
    )
}

export function ItemInfoDetail({ className = "", name, size }) {
    return (
        <div className={"item__info__detail " + className}>
            <span className="item__info__name">{name}</span>
            <div className="item__info__attributes">
                <span>{size}</span>
            </div>
        </div>
    )
}

export function ItemInfoPrice({ className = "", regularPrice, salePrice }) {
    return (
        <div className={"item__info__price " + className}>
            <span className="item__info__price--on-sale">{salePrice}</span>
            <span className="item__info__price--regular">{regularPrice}</span>
        </div>
    )
}

function ActionsBtton({
    className = "",
    increaseQty,
    decreaseQty,
    inputQty,
    qty,
    inStock
}) {
    const showDecrementBtn = Boolean(inStock && qty && qty > 0)
    const showInput = Boolean(inStock && qty && qty > 0)
    const showIncrementBtn = Boolean(inStock)
    const showOutOfStockText = Boolean(!inStock)

    return (
        <div
            className={
                "item__actions-wraper d-flex flex-row justify-content-around align-items-center " +
                className
            }
        >
            {showDecrementBtn && (
                <i
                    className="item__actions__decrement  d-flex align-items-center justify-content-center btn btn-warning bi bi-dash"
                    onClick={decreaseQty}
                ></i>
            )}

            {showInput && (
                <input
                    className="item__actions__current-num"
                    type="text"
                    value={qty}
                    onChange={(e) => inputQty(Number(e.target.value))}
                ></input>
            )}

            {showIncrementBtn && (
                <i
                    className="item__actions__increment d-flex align-items-center justify-content-center btn btn-warning bi bi-plus "
                    onClick={increaseQty}
                ></i>
            )}

            {showOutOfStockText && (
                <div className="item__out-of-stock">缺货</div>
            )}
        </div>
    )
}
