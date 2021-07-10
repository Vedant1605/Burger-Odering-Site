import * as actionTypes from '../actions/actionType'
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:"/",
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_JUST_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_REDIRECT:
            return {
                ...state,
                authRedirectPath: action.path
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                error: null,
                loading: false,
                token: null,
                userId: null,
            }


        default:
            return state;
    }
}
export default authReducer