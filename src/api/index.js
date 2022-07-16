import axios from 'axios'
import store from 'store/store'
import { startLoading, stopLoading } from 'store/reducers/loading.slice'
import { openSnack } from 'store/reducers/snack.slice'


export * from './user'

axios.interceptors.request.use(req => {
    store.dispatch(startLoading())
    return {
        ...req,
        baseURL: 'http://localhost:8080',
        headers: {

        }
    }
}, err => {
    if (err.response && err.response.data && err.response.data.error) { store.dispatch(openSnack({ type: 'error', text: err.response.data.error })) }
    else { store.dispatch(openSnack({ type: 'error', text: err.message })) }
    store.dispatch(stopLoading());
    return err
});

axios.interceptors.response.use(res => {
    store.dispatch(stopLoading());
    return res
}, err => {
    console.log(err.message)
    if (err.response && err.response.data && err.response.data.message) { store.dispatch(openSnack({ type: 'error', text: err.response.data.message })) }
    else if (err.response && err.response.data && err.response.data.error) { store.dispatch(openSnack({ type: 'error', text: err.response.data.error })) }
    else { store.dispatch(openSnack({ type: 'error', text: err.message })) }
    store.dispatch(stopLoading());
    throw err
});
