import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'User',
    initialState: null,
    reducers: {
        setUser: (state, action) => state = action.payload,
        logout: (state) => {
            localStorage.removeItem('user');
            return state = null
        }
    }
})

export const { logout, setUser } = UserSlice.actions;
export default UserSlice.reducer
