import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false,
    purchased: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_Init:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_Burger_Start:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.PURCHASE_Burger_Success:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                order: state.order.concat(newOrder)
            };
        case actionTypes.PURCHASE_Burger_Fail:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.FETCH_Orders_Start:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_Orders_Success:
            return {
                ...state,
                order: action.orders,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;