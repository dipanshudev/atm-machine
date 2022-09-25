
import { combineReducers } from "redux";

import { atmReducer } from "./atmReducer"
const rootReducer = combineReducers({
    atm: atmReducer,
})

export default rootReducer;