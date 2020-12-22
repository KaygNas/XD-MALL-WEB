import blankImg from "../../images/blank_img.png"
import { ItemInfoDetail, ItemInfoPrice } from "../home/Content"

export default function ProductsList({ item = {} }) {
    return (
        <ul className="products-list list-group">
            <li className="products-list__item border-bottom">
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
                    <span className="produts-list__item__qty">x{item.qty}</span>
                )}
            </li>
        </ul>
    )
}
