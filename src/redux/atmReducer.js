import { UPDATE_ATM_CURRENCY } from "./atmAction";

const initialState = {
    currencyOf2000 : 0,
    currencyOf500 : 0,
    currencyOf200 : 0,
    currencyOf100 : 0,
    totalAmount : 0
}

export const atmReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ATM_CURRENCY:
            return {
                ...state,
                currencyOf2000 : action.payload.currencyOf2000,
                currencyOf500 : action.payload.currencyOf500,
                currencyOf200 : action.payload.currencyOf200,
                currencyOf100 : action.payload.currencyOf100,
                totalAmount : action.payload.totalAmount
            };
        default:
            return state;
    }
}