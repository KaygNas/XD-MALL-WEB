import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { getDataByApi } from "./dataRequest"

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    return (await getDataByApi("cart")).data
})

export const cartItemsAdapter = createEntityAdapter()

const cartSlice = createSlice({
    name: "cart",
    initialState: { status: "idle", items: cartItemsAdapter.getInitialState() },
    reducers: {
        increaseItemQty: (state, action) => {
            const item = action.payload
            const cartItems = state.items
            const itemInCart = selectItemById(cartItems, item.id)
            if (itemInCart) {
                const update = {
                    id: itemInCart.id,
                    changes: {
                        qty: itemInCart.qty + 1
                    }
                }
                cartItemsAdapter.updateOne(cartItems, update)
            } else {
                cartItemsAdapter.addOne(cartItems, { ...item, qty: 1 })
            }
            state.total = calcItemsTotal(selectAllItems(state))
        },

        decreaseItemQty: (state, action) => {
            const item = action.payload
            const cartItems = state.items
            const itemInCart = selectItemById(cartItems, item.id)

            if (itemInCart && itemInCart.qty > 1) {
                const update = {
                    id: itemInCart.id,
                    changes: {
                        qty: itemInCart.qty - 1
                    }
                }
                cartItemsAdapter.updateOne(cartItems, update)
            } else {
                cartItemsAdapter.removeOne(cartItems, itemInCart.id)
            }

            state.total = calcItemsTotal(selectAllItems(state))
        },

        changeItemQty: (state, action) => {
            const item = action.payload
            const cartItems = state.items
            const itemInCart = selectItemById(cartItems, item.id)

            if (item.qty > 0) {
                const update = {
                    id: itemInCart.id,
                    changes: {
                        qty: item.qty
                    }
                }
                cartItemsAdapter.updateOne(cartItems, update)
            } else {
                cartItemsAdapter.removeOne(itemInCart.id)
            }

            state.total = calcItemsTotal(selectAllItems(state))
        }
    },

    extraReducers: {
        [fetchCart.fulfilled]: (state, action) => {
            cartItemsAdapter.addMany(state.items, action.payload.items)
            state.status = "succeeded"
            state.total = action.payload.total
            state.subTotal = action.payload.subTotal
        }
    }
})

export const {
    increaseItemQty,
    decreaseItemQty,
    changeItemQty
} = cartSlice.actions

export const { selectById: selectItemById } = cartItemsAdapter.getSelectors()

export function selectAllItems(state) {
    return Object.values(state.items.entities)
}

export default cartSlice.reducer

function calcItemsTotal(items) {
    return items.reduce((acc, cur) => cur.salePrice * cur.qty + acc, 0)
}
