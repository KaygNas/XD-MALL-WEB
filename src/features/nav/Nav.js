import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../app/cartSlice"
import { getDataByApi } from "../../app/dataRequest"
import CartDropList from "./CartDropList"
import SearchResultList from "./SearchResultList"
import _ from "lodash"

export default function Nav() {
    const [showCartList, setShowCartList] = useState(false)
    const [searchResult, setSearchResult] = useState({
        status: "idle",
        data: []
    })
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    function showElementByType(type) {
        switch (type) {
            case "cart":
                setShowCartList((state) => !state)
                break
            default:
        }
    }

    function onSearchInput(input) {
        setSearchInput(input)
        resetSearchResult()
        fetchSearchResultByInput(input)
    }

    var fetchSearchResultByInput = useCallback(
        _.debounce((input) => {
            setSearchResult((state) => {
                return { ...state, status: "loading" }
            })
            setTimeout(async () => {
                const result = (await getDataByApi("search?q=" + input)).data
                setSearchResult({ status: "succeeded", data: result })
            }, 2000)
        }, 800),
        []
    )

    function clearSearchInput() {
        setSearchInput("")
        resetSearchResult()
    }

    function resetSearchResult() {
        setSearchResult({
            status: "idle",
            data: []
        })
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
                        <input
                            className="nav-bar__search__input"
                            placeholder="输入要找的商品"
                            value={searchInput}
                            onChange={(e) => onSearchInput(e.target.value)}
                        ></input>
                        <i
                            className="nav-bar__search__icon--end bi bi-x"
                            onClick={clearSearchInput}
                        ></i>
                    </div>
                </div>

                <ActionButtons
                    showElementByType={showElementByType}
                ></ActionButtons>
            </div>

            {searchResult.status !== "idle" && (
                <SearchResultList
                    listItems={searchResult.data}
                    status={searchResult.status}
                ></SearchResultList>
            )}
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
