import blankImg from "../../images/blank_img.png"
import { ArrowLeftShort, ArrowRightShort } from "../../images/Icons"

export default function Categories() {
    const categories = new Array(20).fill(0)

    return (
        <nav className="categories-wraper d-flex flex-row">
            <div class="categories-controler__prev">
                <ArrowLeftShort className="categories-controler__arrow"></ArrowLeftShort>
            </div>
            {categories.map(() => <Category />)}
            <div class="categories-controler__next">
                <ArrowRightShort className="categories-controler__arrow"></ArrowRightShort>
            </div>
        </nav>
    )
}

function Category() {
    return (
        <div className="category-wraper d-flex flex-column align-items-center">
            <img className="category__icon" alt="分类1" src={blankImg}></img>
        分类1
        </div>
    )
}