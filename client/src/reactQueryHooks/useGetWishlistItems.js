import { useQuery } from "react-query"
import { getWishlistItems } from "../api/apiWishlist";

const useGetWishlistItems = (token, user) => {
  return useQuery('wishlistData', () => getWishlistItems(token), {
    enabled: user !== null,
    onSuccess: (wishlistData) => {
      console.log('Wishlist', wishlistData)
    }
  });
};


export default useGetWishlistItems;
