import * as actionTypes from './actionTypes';

export const AuthStart = () => {
    return {
        type: actionTypes.AUTH_Start
    }
}

export const AuthSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_Success,
        idToken: token,
        userId: userId
    }
}

export const AuthFail = (error) => {
    return {
        type: actionTypes.AUTH_Fail,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_Logout
    };
}

export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000);
    }
}

export const auth = (email, password, signUp) => {
    return dispatch => {
        dispatch(AuthStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        let Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKi2fEhB4yHFxndWHLDqbMdV4WT6ykmPY'

        if (!signUp) {
            Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKi2fEhB4yHFxndWHLDqbMdV4WT6ykmPY'
        }
        fetch(Url,
            {
                method: 'POST',
                body: JSON.stringify(authData)
            }
        ).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    dispatch(AuthFail(data.error))
                }
                else {
                    dispatch(AuthSuccess(data.idToken, data.localId));
                    dispatch(checkAuthTimeout(data.expiresIn))
                }
            })
        }
        )

    }
}

