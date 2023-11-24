import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';


const receiveUserEmail = async (name, email, message) => {
    return apiRequest(`${BASE_URL}/contact`, 'POST' , null, { name: name, email: email, message: message })
};


export { receiveUserEmail }