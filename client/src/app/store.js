// store.js is to manage global state and functions
// to use config we have to import redex

import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store;