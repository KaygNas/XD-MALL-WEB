import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDataByApi } from "./dataRequest"

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    return (await getDataByApi("cart")).data
})

const cartSlice = createSlice({
    name: "cart",
    initialState: { status: "idle", items: [] },
    reducers: {
        insertItemIntoCart: (state, action) => {
            const item = action.payload
            state.items.push(item)
            state.total = calcItemsTotal(state.items)
        },
        changeItemQtyInCart: (state, action) => {
            const { id, qty } = action.payload
            const item = selectItemById(state, id)
            item.qty = qty
            state.total = calcItemsTotal(state.items)
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload
            const index = state.items.findIndex((item) => item.id === id)
            index > -1 && state.items.splice(index, 1)
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
    changeItemQtyInCart,
    insertItemIntoCart,
    removeItemFromCart
} = cartSlice.actions

export function selectItemById(state, id) {
    return state.items.find((item) => item.id === id)
}

function calcItemsTotal(items) {
    return items.reduce((acc, cur) => cur.salePrice * cur.qty + acc, 0)
}
