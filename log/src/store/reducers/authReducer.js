import * as actionTypes from '../actions/actionType';

const initialState={

    token:null,

    userId:null,

    loading:false,

    error:''

}

const authReducer=(state=initialState,action)=>{

    switch(action.type){

        case(actionTypes.AUTH_START):

            return {

                ...state,

                loading:true

            }
        

        case (actionTypes.AUTH_SUCCESS):

            return {

                ...state,

                loading:false,

                token:action.token,

                userId:action.userId,

                error:''

            }
 

        case(actionTypes.AUTH_FAILED):

            return {

                ...state,

                loading:false,

                error:action.error

            }

        case (actionTypes.AUTH_LOGOUT):
        
            return{

                ...state,

                token:null,

                userId:null,

                loading:false

            }
        
        case (actionTypes.ERROR_MESSAGE_CLEAR):
        
            return{

                ...state,

                error:''
                
            }

        default:
        
            return state;

    }

}

export default authReducer