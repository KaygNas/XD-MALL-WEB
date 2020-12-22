import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDataByApi } from "./dataRequest"

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    return (await getDataByApi("cart")).data
})

const cartSlice = createSlice({
    name: "cart",
    initialState: { status: "idle", items: [] },
    reducers: {
        changeItemQty: (state, action) => {
            const { id, qty } = action.payload
            const item = selectItemById(state, id)
            item.qty = qty
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

export const { changeItemQty } = cartSlice.actions

export function selectItemById(state, id) {
    return state.items.find((item) => item.id === id)
}
