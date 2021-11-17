import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_Ingredient,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_Ingredient,
        ingredientName: name
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_Ingredient,
        ingredient: ingredients
    }
}

export const initIngredient = () => {
    return dispatch => {
        fetch('https://burger-project-d1460.firebaseio.com/ingredients.json',
            { method: 'GET' }
        ).then((response) => {
            response.json().then((data) => {
                dispatch(setIngredient(data))
            })

        }
        )
    }
}

