import * as actionTypes from'../actions/actionType'

const INGREDEINTS_PRICE = {
    salad: 5,
    tomato: 5,
    tikki: 10,
    cheese: 20,
}

const initialState={
    ingredients:null,
    totalPrice:30,
    error:false,
    building:false

}
 const bugerBuliderReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]+1
            },
            totalPrice:state.totalPrice+INGREDEINTS_PRICE[action.ingredientName],
            building:true
        }
        case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]-1
            },
            totalPrice:state.totalPrice-INGREDEINTS_PRICE[action.ingredientName],
            building:true
        }
        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    tomato:action.ingredients.tomato,
                    cheese:action.ingredients.cheese,
                    tikki:action.ingredients.tikki,
                    // FOR CHANGING THE SEQUENCE FOR VISUALS
                    // ingredients:action.ingredients can also be done
                },
                error:false,
                totalPrice:30,
                building:false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:false,
            }
        default:
            return state
    } 

 }
 export default bugerBuliderReducer