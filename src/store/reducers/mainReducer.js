import * as actionType from '../actions/actionType';

const initialState = {
    loading: false,
    errorPost: null,
    errorGet: null,
    errorUpdate: null,
    errorDelete: null,
    posts: [],
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_START:
            return {
                ...state,
                loading: true,
            };
        case actionType.POST_SUCCESS:
            return {
                ...state,
            };
        case actionType.POST_FAILED:
            return {
                ...state,
                loading: false,
                errorPost: action.error,
            };
        case actionType.GET_SUCCESS:
            return {
                ...state,
                posts: state.posts.concat(action.retrievedPosts),
                loading: false,
            };
        case actionType.GET_FAILED:
            return {
                ...state,
                loading: false,
                errorGet: action.error,
            };
        case actionType.CLEAR:
            return {
                ...state,
                posts: [],
            };
        case actionType.UPDATE_START:
            return {
                ...state,
                loading: true,
            };
        case actionType.UPDATE_SUCCESS:
            return {
                ...state,
            };
        case actionType.UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                errorUpdate: action.error,
            };
        case actionType.DELETE_START:
            return {
                ...state,
                loading: true,
            };
        case actionType.DELETE_SUCCESS:
            return {
                ...state,
            };
        case actionType.DELETE_FAILED:
            return {
                ...state,
                loading: false,
                errorDelete: action.error,
            };
        default:
            return state;
    }
};

export default mainReducer;
