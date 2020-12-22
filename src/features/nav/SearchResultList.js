import ProductsList from "../common/ProductsList"
import { renderProductsListFromArray } from "./CartDropList"

export default function SearchResultList({ listItems, status }) {
    return (
        <div className="search-result-list-wraper drop-list">
            <div className="search-result-list">
                {status === "loading" && (
                    <i class="bi bi-arrow-counterclockwise search-result-list__loading-icon animation--loading"></i>
                )}
                {renderProductsListFromArray(listItems)}
            </div>
        </div>
    )
}
