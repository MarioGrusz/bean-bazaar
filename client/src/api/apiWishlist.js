import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';


const getWishlistItems = async (token) => {
    return apiRequest(`${BASE_URL}/wishlist`, 'GET', token);
};

const addItemToWishlist = async (id, token) => {
    return apiRequest(`${BASE_URL}/wishlist/add`, 'POST', token, { productId: id })
};

const deleteWishlistItem = async (id, token) => {
    return apiRequest(`${BASE_URL}/wishlist/delete`, 'POST', token, { productId: id })
}


export { 
    getWishlistItems,
    addItemToWishlist,
    deleteWishlistItem 
}

