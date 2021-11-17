import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 20,
}
const INGREDIENT_PRICE = {
    salad: 12,
    bacon: 10,
    meat: 20,
    cheese: 8,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_Ingredient:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_Ingredient:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.SET_Ingredient:
            return {
                ...state,
                ingredients: {
                    bacon: action.ingredient.bacon,
                    meat: action.ingredient.meat,
                    salad: action.ingredient.salad,
                    cheese: action.ingredient.cheese,
                },
                totalPrice: 20
            }
        default:
            return state;
    }



}

export default reducer;