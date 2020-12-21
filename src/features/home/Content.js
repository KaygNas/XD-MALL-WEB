import PopUp from "../common/PopUp"
import { changeItemQty as changeItemQtyInCart } from "../../app/cartSlice"
import { useDispatch } from "react-redux"

export default function Content({ products, setProducts }) {
    const dispatch = useDispatch()

    function increaseItemQtyById(id) {
        const item = selectItemById(id)
        item.qty = item.qty ? item.qty + 1 : 1
        dispatch(changeItemQtyInCart({ id, qty: item.qty }))
        setProducts([...products])
    }

    function decreaseItemQtyById(id) {
        const item = selectItemById(id)
        item.qty = item.qty && item.qty > 0 ? item.qty - 1 : 0
        dispatch(changeItemQtyInCart({ id, qty: item.qty }))
        setProducts([...products])
    }

    function changeItemQtyByIdAndNum(id, num) {
        const item = selectItemById(id)
        item.qty = num && num > 0 ? num : 0
        dispatch(changeItemQtyInCart({ id, qty: item.qty }))
        setProducts([...products])
    }

    function selectItemById(id) {
        return products.find((item) => item.id === id)
    }

    return (
        <>
            <div className="content-wraper d-flex flex-column">
                <div className="content__header d-flex">
                    <h2 className="content__header-title mx-auto">特价商品</h2>
                    <div className="content__header-filter">
                        <input
                            className="content__header-filter__input"
                            type="checkbox"
                            name="checkbox__only-in-stock"
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
                    {products.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            increaseQty={() => increaseItemQtyById(item.id)}
                            decreaseQty={() => decreaseItemQtyById(item.id)}
                            inputQty={(num) =>
                                changeItemQtyByIdAndNum(item.id, num)
                            }
                        ></ItemCard>
                    ))}
                </div>
            </div>
            {/* <ItemDetailPopUp></ItemDetailPopUp> */}
        </>
    )
}

function ItemDetailPopUp() {
    return (
        <PopUp>
            <div className="item-detail-wraper d-flex flex-column align-items-center">
                <div className="item-detail border-bottom">
                    <ItemImg className="item-detail__img"></ItemImg>
                    <div className="item-detail__summary border-bottom">
                        <span className="item-detail__summary__name">
                            我有一个新名字
                        </span>
                        <div className="item-detail__summary__price">
                            <span className="item-detail__summary__price--on-sale item__info__price--on-sale">
                                ￥123.5
                            </span>
                            <span className="item-detail__summary__price--regular item__info__price--regular">
                                ￥223.5
                            </span>
                        </div>
                    </div>
                    <div className="item-detail__info d-flex flex-column">
                        <span>规格：250mL*24</span>
                    </div>
                </div>
                <ActionsBtton></ActionsBtton>
            </div>
        </PopUp>
    )
}

function ItemCard({ item, increaseQty, decreaseQty, inputQty }) {
    return (
        <div className="item-card-wraper col-3 ">
            <div className="item d-flex flex-column align-items-center">
                <ItemImg src={item.image.src}></ItemImg>
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
                ></ActionsBtton>
            </div>
        </div>
    )
}

function ItemImg({ className = "", src }) {
    return (
        <img
            className={"item__img " + className}
            alt="item_img"
            src={src}
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
    qty
}) {
    return (
        <div
            className={
                "item__actions-wraper d-flex flex-row justify-content-around align-items-center " +
                className
            }
        >
            {qty > 0 && (
                <>
                    <i
                        className="item__actions__decrement  d-flex align-items-center justify-content-center btn btn-warning bi bi-dash"
                        onClick={decreaseQty}
                    ></i>

                    <input
                        className="item__actions__current-num"
                        type="text"
                        value={qty}
                        onChange={(e) => inputQty(e.target.value)}
                    ></input>
                </>
            )}
            <i
                className="item__actions__increment d-flex align-items-center justify-content-center btn btn-warning bi bi-plus "
                onClick={increaseQty}
            ></i>
        </div>
    )
}
