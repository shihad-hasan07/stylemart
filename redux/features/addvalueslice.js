import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0
}

const addvalueslice = createSlice({
    name: 'addValueeee',
    initialState,
    reducers: {
        increment: (state) => {
            state.value = state.value + 1
        },
        decrement:(state)=>{
            state.value=state.value-1
        }
    }
})

export const { increment,decrement } = addvalueslice.actions
export default addvalueslice.reducer