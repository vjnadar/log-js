import * as actionType from './actionType';

import axios from '../../http/axios';

import {get} from './getActions';

export const deleteStart=(retrievedPosts)=>{

    return{

        type:actionType.DELETE_START,

    }

}


export const deleteSuccess=(retrievedPosts)=>{

    return{

        type:actionType.DELETE_SUCCESS,

    }

}

export const deleteFailed=(error)=>{

    return{

        type:actionType.DELETE_FAILED,

        error:error

    }
    
}

export const deletePost=(token,userId,id)=>{

    return dispatch=>{

        dispatch(deleteStart());

        axios.delete('post/'+id+'.json').then(res=>{

            dispatch(deleteSuccess());
           
            dispatch(get(token,userId));

        }).catch(error=>{

            dispatch(deleteFailed());

            console.log(error);

        })

    }

}   