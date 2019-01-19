import axios from 'axios';

let ES6Promise = require("es6-promise");

ES6Promise.polyfill();

const axios_main=axios.create(
    
    {

        baseURL:'https://notes-927ca.firebaseio.com/'

    });

export default axios_main;