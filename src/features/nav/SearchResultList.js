import ProductsList from "../common/ProductsList"


export default function SearchResultList() {
    return (
        <div className="search-result-list-wraper drop-list">
            <div className="search-result-list">
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
                <ProductsList></ProductsList>
            </div>
        </div>
    )
}