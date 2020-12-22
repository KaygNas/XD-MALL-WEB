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
            debugger
            const item = action.payload
            state.items.push(item)
        },
        changeItemQtyInCart: (state, action) => {
            const { id, qty } = action.payload
            const item = selectItemById(state, id)
            item.qty = qty
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload
            const index = state.items.findIndex((item) => item.id === id)
            debugger
            index > -1 && state.items.splice(index, 1)
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
