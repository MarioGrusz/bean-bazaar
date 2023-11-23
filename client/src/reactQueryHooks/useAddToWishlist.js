import { useMutation, useQueryClient } from "react-query";
import { addItemToWishlist } from "../api/apiWishlist";


const useAddToWishlist = () => {


    const queryClient = useQueryClient();
    return useMutation(({ id, token, newItem }) => addItemToWishlist(id, token), {
        onMutate : async (paramsObject) => {
            await queryClient.cancelQueries('wishlistData');
            const previousWishlistData = queryClient.getQueryData('wishlistData');
            //console.log('Before mutation:', previousWishlistData);
            const newWishlistItem = paramsObject.newItem;
            queryClient.setQueryData('wishlistData', {
                ...previousWishlistData,
                data: [...previousWishlistData.data, newWishlistItem]
            });
            return { previousWishlistData, newWishlistItem };
        },

        onError: (err, newItem, context) => {
            queryClient.setQueryData('wishlistData', context.previousWishlistData);
        },
        onSettled: () => {
            //console.log('After mutation:', queryClient.getQueryData('wishlistData'));
            queryClient.invalidateQueries('wishlistData')
        }

    })
}

export default useAddToWishlist
