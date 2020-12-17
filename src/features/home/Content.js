import blankImg from "../../images/blank_img.png"

export default function Content() {
    return (
        <div className="content-wraper d-flex flex-column">
            <div className="content__header d-flex">
                <h2 className="content__header-title mx-auto">特价商品</h2>
                <div className="content__header-filter">
                    <input className="content__header-filter__input" type="checkbox" name="checkbox__only-in-stock"></input>
                    <label className="content__header-filter__label" for="checkbox__only-in-stock">只看有货</label>
                </div>
            </div>

            <div className="content__main row">
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
            </div>
        </div>
    )
}

function ItemCard() {
    return (
        <div className="item-card-wraper col-3 ">
            <div className="item d-flex flex-column align-items-center">
                <img className="item__img" alt="item_img" src={blankImg}></img>

                <ItemInfo></ItemInfo>

                <ActionsBtton></ActionsBtton>
            </div>
        </div>
    )
}

function ItemInfo() {
    return (
        <div className="item__info d-flex flex-column align-items-bottom">
            <div className="item__info__detail">
                <span className="item__info__name">百事可乐</span>
                <div className="item__info__attributes">
                    <span>250mL*24</span>
                </div>
            </div>
            <div className="item__info__price">
                <span className="item__info__price--on-sale">￥24</span>
                <span className="item__info__price--reguler">￥25.5</span>
            </div>
        </div>
    )
}

function ActionsBtton() {
    return (
        <div className="item__actions-wraper d-flex flex-row justify-content-around align-items-center">
            <i className="item__actions__decrement  d-flex align-items-center justify-content-center btn btn-warning bi bi-dash"></i>

            <span className="item__actions__current-num">1</span>

            <i class="item__actions__increment d-flex align-items-center justify-content-center btn btn-warning bi bi-plus "></i>
        </div>
    )
}