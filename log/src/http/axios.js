import axios from 'axios';

const axios_main=axios.create(
    
    {

        baseURL:'https://notes-927ca.firebaseio.com/'

    });

export default axios_main;