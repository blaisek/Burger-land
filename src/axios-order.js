import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-factory-c7518.firebaseio.com/'
})



export default instance; 