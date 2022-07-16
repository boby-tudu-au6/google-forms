import axios from 'axios'
import store from 'store/store'
import { openSnack } from 'store/reducers/snack.slice'
import { setUser } from 'store/reducers/user.slice'
import jwtDecode from 'jwt-decode'
import { setToken } from 'store/reducers/password.slice'

export const registerUser = async (values) => {
    try {
        const { data } = await axios.post('/user/register', values)
        if (data) store.dispatch(openSnack({ type: "success", text: "user registered successfully" }))
    } catch (error) {
        console.log(error.message)
    }
}

export const loginUser = async (values) => {
    try {
        const { data } = await axios.post('/user/login', values);
        if (data) {
            localStorage.setItem('user', data.data)
            const user = jwtDecode(data.data)
            store.dispatch(setUser(user))
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const forgotPassword = async (values) => {
    try {
        const { data } = await axios.post('/user/forgot-password', values)
        if (data) {
            localStorage.setItem("token", data.data)
            store.dispatch(setToken(data.data))
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const resetPassword = async (values, token) => {
    try {
        const { data } = await axios.post('/user/reset-password', { ...values, token })
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get('/user/all-user-list')
        return data
    } catch (error) {
        console.log(error.message)
    }
}