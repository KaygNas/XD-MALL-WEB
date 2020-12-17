import { ArrowLeft, ArrowRight } from "../../images/Icons"

export default function MyCarousel({ children }) {
    let carouselItems = []
    if (Array.isArray(children)) {
        carouselItems = children
    } else if (children) {
        carouselItems = [children]
    }

    return (
        <div className="my-carousel-wraper">
            <div className="my-carousel__controler__prev">
                <ArrowLeft className="my-carousel__controler__arrow"></ArrowLeft>
            </div>
            {carouselItems}
            <div className="my-carousel__controler__next">
                <ArrowRight className="my-carousel__controler__arrow"></ArrowRight>
            </div>

            <Indicators curIndex={1} itemAmount={carouselItems.length}></Indicators>
        </div>
    )
}


export function Indicators({ curIndex, itemAmount }) {
    const indicators = new Array(itemAmount).fill(0).map((value, index) =>
        <span className={index === curIndex ? "indicator--current" : "indicator"}></span>
    )

    return (
        <div className="indicators-wraper">
            {indicators}
        </div>
    )

}