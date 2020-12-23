import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDataByApi } from "./dataRequest"

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    return (await getDataByApi("cart")).data
})

const cartSlice = createSlice({
    name: "cart",
    initialState: { status: "idle", items: [] },
    reducers: {
        increaseItemQty: (state, action) => {
            const item = action.payload
            const { item: itemInCart, index } = selectItemById(state, item.id)
            if (index > -1) {
                itemInCart.qty += 1
            } else {
                item.qty = 1
                state.items.push(item)
            }
            state.total = calcItemsTotal(state.items)
        },
        decreaseItemQty: (state, action) => {
            const item = action.payload
            const { item: itemInCart, index } = selectItemById(state, item.id)
            if (index > -1 && itemInCart.qty > 1) {
                itemInCart.qty -= 1
            } else {
                state.items.splice(index, 1)
            }
            state.total = calcItemsTotal(state.items)
        },
        changeItemQty: (state, action) => {
            const item = action.payload
            const { item: itemInCart, index } = selectItemById(state, item.id)
            if (item.qty > 0) {
                itemInCart.qty = item.qty
            } else {
                state.items.splice(index, 1)
            }
            state.total = calcItemsTotal(state.items)
        }
    },
    extraReducers: {
        [fetchCart.fulfilled]: (state, action) => {
            action.payload.status = "succeeded"
            return action.payload
        }
    }
})

export default cartSlice.reducer

export const {
    increaseItemQty,
    decreaseItemQty,
    changeItemQty
} = cartSlice.actions

export function selectItemById(state, id) {
    const item = state.items.find((item) => item.id === id)
    const index = state.items.indexOf(item)
    return { item, index }
}

function calcItemsTotal(items) {
    return items.reduce((acc, cur) => cur.salePrice * cur.qty + acc, 0)
}
