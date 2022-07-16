import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './reducers/loading.slice'
import passwordSlice from './reducers/password.slice'
import snackSlice from './reducers/snack.slice'
import userSlice from './reducers/user.slice'

const store = configureStore({
    reducer: {
        loader: loadingSlice,
        snack: snackSlice,
        user: userSlice,
        password:passwordSlice
    }
})

export default store
