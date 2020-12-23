import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../app/cartSlice"
import { getDataByApi } from "../../app/dataRequest"
import CartDropList from "./CartDropList"
import SearchResultList from "./SearchResultList"
import _ from "lodash"

export default function Nav() {
    const [showCartList, setShowCartList] = useState(false)
    const [showSearchBar, setShowSearchBar] = useState(false)
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
            case "search":
                setShowSearchBar((state) => {
                    state && clearInputAndResult()
                    return !state
                })
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

    function clearInputAndResult() {
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
                <SearchBar
                    showSearchBar={showSearchBar}
                    searchResult={searchResult}
                    value={searchInput}
                    onChange={(e) => onSearchInput(e.target.value)}
                    onCancel={() => showElementByType("search")}
                ></SearchBar>
                <ActionButtons
                    showElementByType={showElementByType}
                ></ActionButtons>
            </div>

            <CartDropList
                showCartList={showCartList}
                cart={cart}
            ></CartDropList>
        </nav>
    )
}

function SearchBar({ showSearchBar, value, onChange, onCancel, searchResult }) {
    return (
        <div
            className={`mx-auto nav-bar__search-wraper ${
                showSearchBar ? "animation--show" : "animation--hide"
            }`}
        >
            <div className="nav-bar__search">
                <i className="nav-bar__search__icon--start  bi bi-search"></i>
                <input
                    className="nav-bar__search__input"
                    placeholder="输入要找的商品"
                    value={value}
                    onChange={onChange}
                    autoFocus={true}
                ></input>
                <i
                    className="nav-bar__search__icon--end bi bi-x"
                    onClick={onCancel}
                ></i>
            </div>

            <SearchResultList
                className={
                    searchResult.status !== "idle"
                        ? "animation--show"
                        : "animation--hide"
                }
                listItems={searchResult.data}
                status={searchResult.status}
            ></SearchResultList>
        </div>
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
