import { popUpItemContext } from "../../App"
import blankImg from "../../images/blank_img.png"
import { ItemInfoDetail, ItemInfoPrice } from "../home/Content"
import { useContext } from "react"

export default function ProductsList({ items = [] }) {
    const setPopUpItem = useContext(popUpItemContext)
    return (
        <ul className="products-list list-group">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="products-list__item border-bottom"
                    onClick={() => setPopUpItem(item)}
                >
                    <img
                        className="products-list__item__img"
                        alt="product-img"
                        src={item.image.src}
                    ></img>
                    <ItemInfoDetail
                        className="products-list__item__detail"
                        name={item.name}
                        size={item.size}
                    ></ItemInfoDetail>
                    <ItemInfoPrice
                        className="d-flex flex-column align-items-bottom"
                        regularPrice={item.regularPrice}
                        salePrice={item.salePrice}
                    ></ItemInfoPrice>
                    {item.qty && (
                        <span className="produts-list__item__qty">
                            x{item.qty}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    )
}
