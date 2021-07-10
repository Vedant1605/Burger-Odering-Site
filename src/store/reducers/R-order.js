import * as actionType from '../actions/actionType'

const initialState={
    order:[],
    loading :false,
    purchased:false,
    fetchedOrders:[],
}


const orderReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.PURCHASE_INITIALISE:
            return{
                ...state,
                purchased:false
            }
        case actionType.PURCHASE_BURGER_JUST_START:
            return{
                ...state,
                loading:true
            }
        
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.orderId,
            }
            return{
                ...state,
                purchased:true,
                loading:false,
                order:state.order.concat(newOrder),
            }
            break;
            
        case actionType.PURCHASE_BURGER_FAILED:
            return{
                ...state,
                loading:false
            }
            break;
            case actionType.FETCH_ORDERS_JUST_START:
                return{
                    ...state,
                    loading:true
                } 
        case actionType.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                fetchedOrders:action.orders,
                loading:false
            } 
        case actionType.FETCH_ORDERS_FAILED:
            return{
                ...state,
                loading:false
            } 
        default:
            return state
            break;
    }
}
export default orderReducer