import { configureStore, ReducerType } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from "../utils/feedSlice"
import connectionReducer from './connectionSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
    feed :feedReducer,
    connection: connectionReducer,
    },
}
)

export default appStore