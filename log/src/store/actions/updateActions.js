import * as actionType from './actionType';

import axios from '../../http/axios';

import * as getActions from './getActions';

import moment from 'moment';

export const updateStart=()=>{

    return{

        type:actionType.UPDATE_START

    }

}

export const updateSuccess=()=>{

    return{

        type:actionType.UPDATE_SUCCESS


    }

}

export const updateFailed=(error)=>{

    return{

        type:actionType.UPDATE_FAILED,

        error:error

    }
    
}

export const update=(postUpdate,token,userId)=>{

    return dispatch=>{

        const postDB={

            post:postUpdate['post'],

            time:moment().format('MMMM Do YYYY, h:mm:ss a'),

            userid:userId
        }

        dispatch(updateStart());

        postUpdate['time']=moment().format('MMMM Do YYYY, h:mm:ss a');

        let id=postUpdate.id;

        axios.put('post/'+id+'.json',postDB).then(res=>{

            dispatch(updateSuccess());
            
            dispatch(getActions.get(token,userId));

        }).catch(error=>{

            dispatch(updateFailed(error))

            console.log(error);

        })

    }
    
}