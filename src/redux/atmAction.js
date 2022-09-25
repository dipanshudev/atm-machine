export const UPDATE_ATM_CURRENCY = "UPDATE_ATM_CURRENCY"


export const updateAtmCurrency = (payload) => {
    return {
        type: UPDATE_ATM_CURRENCY,
        payload
    };
};