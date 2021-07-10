import * as actionTypes from './actionType'
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredients = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const fetchIngredients=()=>{
    return dispatch=>{
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data))
        }).catch(error=>{
            dispatch(fetchIngredientsFailed())
        })
    }
}
