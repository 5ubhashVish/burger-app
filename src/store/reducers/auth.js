import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_Start:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_Success:
            return {
                ...state,
                loading: false,
                token: action.idToken,
                userId: action.userId,
                error: null
            }
        case actionTypes.AUTH_Fail:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.AUTH_Logout:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state
    }

}

export default reducer;