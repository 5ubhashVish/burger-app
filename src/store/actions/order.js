import * as actionTypes from './actionTypes'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_Burger_Success,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_Burger_Fail,
        orderId: id,
        orderData: orderData
    }
}


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_Burger_Start
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        fetch('https://burger-project-d1460.firebaseio.com/orders.json?auth=' + token, {
            method: 'POST',
            body: JSON.stringify(orderData)
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    dispatch(purchaseBurgerSuccess(data.name, orderData))
                })

            }
        }
        )
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_Init
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_Orders_Success,
        orders: orders
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_Orders_Start,

    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        fetch('https://burger-project-d1460.firebaseio.com/orders.json?auth=' + token,
            {
                method: 'GET'
            }).then((response) => {
                response.json().then((data) => {
                    const fetchOrders = [];
                    for (let key in data) {
                        fetchOrders.push({
                            ...data[key],
                            id: key
                        })
                    }
                    dispatch(fetchOrdersSuccess(fetchOrders))
                })
            })
    }
}