import blankImg from "../../images/blank_img.png"
import { ItemInfoDetail, ItemInfoPrice } from "../home/Content"

export default function ProductsList() {
    return (
        <ul className="products-list list-group">
            <li className="products-list__item border-bottom">
                <img className="products-list__item__img" alt="product-img" src={blankImg}></img>
                <ItemInfoDetail className="products-list__item__detail"></ItemInfoDetail>
                <ItemInfoPrice className="d-flex flex-column align-items-bottom"></ItemInfoPrice>
            </li>
        </ul>
    )
}