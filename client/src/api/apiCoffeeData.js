import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';

//optional token https://www.phind.com/search?cache=odgi6m064o110w7bf3gymx0f


const getAllCoffeeItems = async (params) => {
    return apiRequest(`${BASE_URL}/data`, 'GET', null, null, params);
};


const getCoffeeOriginsHeaders = async (params) => {
    return apiRequest(`${BASE_URL}/data/origins`, 'GET', null, null, params);
};
  

const getRoasteriessHeaders = async (params) => {
    return apiRequest(`${BASE_URL}/data/roasteries`, 'GET', null, null, params);   
};


export { 
    getAllCoffeeItems,
    getRoasteriessHeaders,
    getCoffeeOriginsHeaders,
}
