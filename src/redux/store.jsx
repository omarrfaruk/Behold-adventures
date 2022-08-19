import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import tourReducer from './features/tourSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        tour: tourReducer
    }

})

export default store