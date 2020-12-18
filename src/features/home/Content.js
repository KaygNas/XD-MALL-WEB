import blankImg from "../../images/blank_img.png"
import PopUp from "../common/PopUp"

export default function Content() {
    return (
        <>
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
            <ItemDetailPopUp></ItemDetailPopUp>
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
                        <span className="item-detail__summary__name">我有一个新名字</span>
                        <div className="item-detail__summary__price">
                            <span className="item-detail__summary__price--on-sale item__info__price--on-sale">￥123.5</span>
                            <span className="item-detail__summary__price--regular item__info__price--regular">￥223.5</span>
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



function ItemCard() {
    return (
        <div className="item-card-wraper col-3 ">
            <div className="item d-flex flex-column align-items-center">
                <ItemImg></ItemImg>
                <ItemInfo></ItemInfo>
                <ActionsBtton></ActionsBtton>
            </div>
        </div>
    )
}

function ItemImg({ className = "" }) {
    return <img className={"item__img " + className} alt="item_img" src={blankImg}></img>
}

function ItemInfo() {
    return (
        <div className="item__info text-center">
            <ItemInfoDetail></ItemInfoDetail>
            <ItemInfoPrice></ItemInfoPrice>
        </div>
    )
}

export function ItemInfoDetail({ className = "" }) {
    return (
        <div className={"item__info__detail " + className}>
            <span className="item__info__name">百事可乐名字很长</span>
            <div className="item__info__attributes">
                <span>250mL*24</span>
            </div>
        </div>
    )
}

export function ItemInfoPrice({ className = "" }) {
    return (
        <div className={"item__info__price " + className}>
            <span className="item__info__price--on-sale">￥24</span>
            <span className="item__info__price--regular">￥25.5</span>
        </div>
    )
}

function ActionsBtton({ className = "" }) {
    return (
        <div className={"item__actions-wraper d-flex flex-row justify-content-around align-items-center " + className}>
            <i className="item__actions__decrement  d-flex align-items-center justify-content-center btn btn-warning bi bi-dash"></i>

            <input className="item__actions__current-num" type="text" value="1"></input>

            <i class="item__actions__increment d-flex align-items-center justify-content-center btn btn-warning bi bi-plus "></i>
        </div>
    )
}