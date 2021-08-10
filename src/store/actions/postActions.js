import * as actionType from './actionType';
import axios from '../../http/axios';
import * as getActions from './getActions';
import moment from 'moment';

export const postStart = () => {
    return {
        type: actionType.POST_START,
    };
};

export const postSuccess = () => {
    return {
        type: actionType.POST_SUCCESS,
    };
};

export const postFailed = (error) => {
    return {
        type: actionType.POST_FAILED,
        error: error,
    };
};

export const clear = () => {
    return {
        type: actionType.CLEAR,
    };
};

export const post = (post, token, userId) => {
    return (dispatch) => {
        dispatch(postStart());
        const savePost = {
            post: post,
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
            userid: userId,
        };
        axios
            .post('post.json', savePost)
            .then((res) => {
                dispatch(postSuccess());
                dispatch(getActions.get(token, userId));
            })
            .catch((error) => {
                dispatch(postFailed(error));
                console.log(error);
            });
    };
};
