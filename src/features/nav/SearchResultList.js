import ProductsList from "../common/ProductsList"
import { SpinArrow } from "../common/Animation"
export default function SearchResultList({ listItems, status, className }) {
    const isLoading = status === "loading"

    return (
        <div className={`search-result-list-wraper drop-list ${className}`}>
            <div className="search-result-list">
                <SpinArrow
                    className="search-result-list__loading-icon"
                    isShown={isLoading}
                ></SpinArrow>
                <ProductsList items={listItems}></ProductsList>
            </div>
        </div>
    )
}
