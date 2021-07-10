import * as actionTypes from './actionType'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerOnFetch = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_JUST_START
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    }
}

export const purchaseBurgerStart = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerOnFetch())
        axios.post('/orders.json?auth=' + token, orderData).then(response => {
            // console.log(response);

            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }).catch(error => {
            // console.log(error)
            dispatch(purchaseBurgerFailed(error))

        });
    }
}

export const purchaseInitialise = () => {
    return {
        type: actionTypes.PURCHASE_INITIALISE
    }
}

//FETCHING ORDERS FROM SERVER

export const fetchOrderSucces = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error,
    }
}

export const fetchOrdersStart = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderJustStart())
        // console.log(userId);
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrderSucces(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFailed(err));
            } );
    }
}

export const fetchOrderJustStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_JUST_START
    }
}