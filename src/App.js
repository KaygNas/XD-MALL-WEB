import React, { useContext, useEffect, useState } from "react"
import Nav from "./features/nav/Nav"
import Home from "./features/home/Home"
import Settle from "./features/settle/Settle"
import SettleSucceed from "./features/settle/SettleSucceed"
import "./App.css"
import { Redirect, Route, Switch } from "react-router-dom"
import { ItemDetailPopUp } from "./features/home/Content"
import {
    increaseItemQty,
    decreaseItemQty,
    changeItemQty
} from "./app/cartSlice"
import { useDispatch, useSelector } from "react-redux"

export const popUpItemContext = React.createContext()

function App() {
    const [popUpItem, setPopUpItem] = useState(null)
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()

    useEffect(() => {
        syncPopUpItemWith(cartItems)
    }, [cartItems])

    function syncPopUpItemWith(items) {
        if (popUpItem) {
            const match = items.find((item) => item.id === popUpItem.id)
            const qty = match ? match.qty : 0
            setPopUpItem({ ...popUpItem, qty })
        }
    }

    return (
        <popUpItemContext.Provider value={setPopUpItem}>
            <div className="container-fluid">
                <Nav></Nav>

                <Switch>
                    <Route exact path="/home">
                        <Home></Home>
                    </Route>
                    <Route exact path="/settle">
                        <Settle></Settle>
                    </Route>
                    <Route exact path="/settle/succeed">
                        <SettleSucceed></SettleSucceed>
                    </Route>
                    <Redirect to="/home"></Redirect>
                </Switch>

                <ItemDetailPopUp
                    item={popUpItem}
                    increaseQty={() => dispatch(increaseItemQty(popUpItem))}
                    decreaseQty={() => dispatch(decreaseItemQty(popUpItem))}
                    inputQty={(qty) => {
                        popUpItem.qty = qty
                        dispatch(changeItemQty(popUpItem))
                    }}
                    onClose={() => setPopUpItem(null)}
                ></ItemDetailPopUp>
            </div>
        </popUpItemContext.Provider>
    )
}

export default App
