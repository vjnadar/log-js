import * as actionType from './actionType';

import {clear} from './postActions';

import axios from '../../http/axios';


export const getSuccess=(retrievedPosts)=>{

    return{

        type:actionType.GET_SUCCESS,

        retrievedPosts:retrievedPosts

    }

}

export const getFailed=(error)=>{

    return{

        type:actionType.GET_FAILED,

        error:error

    }
    
}

export const get=(token,userId)=>{

    return dispatch=>{

        const queryParams='?orderBy="userid"&equalTo="'+userId+'"';

        axios.get('post.json'+queryParams).then(res=>{

            const retrievedPosts=[]
            
            for(let key in res.data){
                
                retrievedPosts.push({id:key,post:res.data[key].post,time:res.data[key].time})
                
            }

            dispatch(clear());

            dispatch(getSuccess(retrievedPosts));

        }).catch(error=>{

            console.log(error);

        })

    }

}