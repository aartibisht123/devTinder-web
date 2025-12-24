import { configureStore, ReducerType } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from "../utils/feedSlice"
import connectionReducer from './connectionSlice'
import requestReducer from './requestSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
    feed :feedReducer,
    connection: connectionReducer,
    requests: requestReducer,
    },
}
)

export default appStore