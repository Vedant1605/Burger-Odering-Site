import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-booze.firebaseio.com/'
})

export default instance;


