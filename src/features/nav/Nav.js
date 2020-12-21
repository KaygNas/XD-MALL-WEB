import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateData } from "../../app/cartSlice"
import { getDataByApi } from "../../app/dataRequest"
import CartDropList from "./CartDropList"
import SearchResultList from "./SearchResultList"

export default function Nav() {
    const [showCartList, setShowCartList] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        getCart()
    }, [])

    function showElementByType(type) {
        switch (type) {
            case "cart":
                setShowCartList((state) => !state)
                break
            default:
        }
    }

    async function getCart() {
        const cart = (await getDataByApi("cart")).data
        dispatch(updateData(cart))
    }

    return (
        <nav className="nav-bar-wraper outter-wraper">
            <div className=" d-flex flex-row align-items-center">
                <div className="nav-bar__favicon mr-auto">
                    <i className="nav-bar__icon bi bi-house"></i>祥达易购
                </div>

                <div className="nav-bar__search-wraper mx-auto">
                    <div className="nav-bar__search">
                        <i className="nav-bar__search__icon--start  bi bi-search"></i>
                        <input className="nav-bar__search__input"></input>
                        <i className="nav-bar__search__icon--end bi bi-x"></i>
                    </div>
                </div>

                <ActionButtons
                    showElementByType={showElementByType}
                ></ActionButtons>
            </div>

            {/* <SearchResultList></SearchResultList> */}
            {showCartList && <CartDropList cart={cart}></CartDropList>}
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
                <i className="nav-bar__icon  bi bi-search" type="button"></i>
                搜索
            </button>
            <button
                className="nav-bar__action-button"
                type="button"
                onClick={() => showElementByType("cart")}
            >
                <i className="nav-bar__icon  bi bi-cart" type="button"></i>
                购物车
            </button>
            <button className="nav-bar__action-button" type="button">
                <i className="nav-bar__icon bi bi-person"></i>我的
            </button>
        </>
    )
}
