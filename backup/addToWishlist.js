import axios from 'axios';
import { BASE_URL } from '../constant/apiConstants';


const addItemToWishlist = async (id) => {

    try{
        const response = await axios.post(`${BASE_URL}/wishlist/add`, {
            productId: id
        });
        return response.data;

    } catch (error) {
        throw new Error("There is an error with fetching wishlist items");
    }

}


export { addItemToWishlist }

// const addItemToWishlist = async (id, token) => {
//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         };
//         const response = await axios.post(`${BASE_URL}/wishlist/add`, {
//             productId: id
//         }, config);
//         return response.data;
//     } catch (error) {
//         throw new Error("There is an error with fetching wishlist items");
//     }
//  }
 
//  export { addItemToWishlist }


// import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const user = auth.currentUser;

// if (user) {
//  user.getIdToken().then((idToken) => {
//  // Call the addItemToWishlist function with the ID token
//  addItemToWishlist(id, idToken);
//  });
// }
