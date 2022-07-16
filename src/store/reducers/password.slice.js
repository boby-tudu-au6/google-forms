import { createSlice } from '@reduxjs/toolkit';

const passwordSlice = createSlice({
    name: 'password',
    initialState:'',
    reducers: {
        setToken: (state,action)=>state = action.payload,
        clearToken: (state)=> state=''
    }
})

export const { setToken, clearToken } = passwordSlice.actions;
export default passwordSlice.reducer
