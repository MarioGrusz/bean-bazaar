import { useMutation, useQueryClient } from "react-query";
import { deleteWishlistItem } from "../api/apiWishlist";

const useDeleteWishlistItem = () => {


    const queryClient = useQueryClient();
    return useMutation(({ id, token }) => deleteWishlistItem(id, token), {
        onSuccess: () => {
            queryClient.invalidateQueries('wishlistData')
        }
    })
}

export default useDeleteWishlistItem