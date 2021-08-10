import * as actionTypes from './actionType';
import axios from '../..//http/axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.token,
        userId: authData.userId,
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authLogout = () => {
    return (dispatch) => {
        dispatch(authStart());
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
        dispatch(logout());
    };
};

export const timeLogout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (credentials, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        let url = process.env.REACT_APP_FIREBASE_SIGNUP_URL;
        if (!isSignUp) {
            url = process.env.REACT_APP_FIREBASE_SIGNIN_URL;
        }
        const postData = {
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true,
        };
        axios
            .post(url, postData)
            .then((res) => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                const authData = {
                    token: res.data.idToken,
                    userId: res.data.localId,
                };
                dispatch(authSuccess(authData));
                dispatch(timeLogout(res.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authFailed(error.response.data.error.message));
            });
    };
};

export const automaticLogout = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const authData = {
            token: token,
            userId: userId,
        };
        if (!token) {
            dispatch(authLogout());
        } else if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(authData));
            const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
            dispatch(timeLogout(expirationTime));
        }
    };
};

export const errorMessageClear = () => {
    return {
        type: actionTypes.ERROR_MESSAGE_CLEAR,
    };
};
