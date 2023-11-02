import { useQuery } from "react-query"
import { getWishlistItems } from "../api/apiWishlist";

const useGetWishlistItems = (token) => {
  return useQuery('wishlistData', () => getWishlistItems(token), {
    onSuccess: (wishlistData) => {
      console.log('Wishlist', wishlistData)
    }
  });
};


export default useGetWishlistItems;
