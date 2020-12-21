import { useState } from "react"
import CartDropList from "./CartDropList"
import SearchResultList from "./SearchResultList"

export default function Nav() {
    const [showCartList, setShowCartList] = useState(false)
    function showElementByType(type) {
        switch (type) {
            case "cart":
                setShowCartList((state) => !state)
                break
            default:
        }
    }

    return (
        <nav className="nav-bar-wraper outter-wraper">
            <div className=" d-flex flex-row align-items-center">
                <div className="nav-bar__favicon mr-auto">
                    <i class="nav-bar__icon bi bi-house"></i>祥达易购
                </div>

                <div className="nav-bar__search-wraper mx-auto">
                    <div className="nav-bar__search">
                        <i className="nav-bar__search__icon--start  bi bi-search"></i>
                        <input class="nav-bar__search__input"></input>
                        <i className="nav-bar__search__icon--end bi bi-x"></i>
                    </div>
                </div>

                <ActionButtons
                    showElementByType={showElementByType}
                ></ActionButtons>
            </div>

            {/* <SearchResultList></SearchResultList> */}
            {showCartList && <CartDropList></CartDropList>}
        </nav>
    )
}

function ActionButtons({ showElementByType }) {
    return (
        <>
            <button
                className="nav-bar__action-button"
                type="button"
                onClick={() => showElementByType("search")}
            >
                <i class="nav-bar__icon  bi bi-search" type="button"></i>搜索
            </button>
            <button
                className="nav-bar__action-button"
                type="button"
                onClick={() => showElementByType("cart")}
            >
                <i class="nav-bar__icon  bi bi-cart" type="button"></i>购物车
            </button>
            <button className="nav-bar__action-button" type="button">
                <i class="nav-bar__icon bi bi-person"></i>我的
            </button>
        </>
    )
}
