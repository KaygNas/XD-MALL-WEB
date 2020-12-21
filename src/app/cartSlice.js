import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [] },
    reducers: {
        updateData: (state, action) => {
            return action.payload
        },
        changeItemQty: (state, action) => {
            const { id, qty } = action.payload
            const item = selectItemById(state, id)
            item.qty = qty
        }
    }
})

export default cartSlice.reducer

export const { updateData, changeItemQty } = cartSlice.actions

export function selectItemById(state, id) {
    return state.items.find((item) => item.id === id)
}
