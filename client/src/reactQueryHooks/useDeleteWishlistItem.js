import { useMutation, useQueryClient } from "react-query";
import { deleteWishlistItem } from "../api/apiWishlist";

const useDeleteWishlistItem = () => {


    const queryClient = useQueryClient();
    return useMutation(({ id, token }) => deleteWishlistItem(id, token), {
        onMutate : async (paramsObject) => {
            await queryClient.cancelQueries('wishlistData');
            const previousWishlistData = queryClient.getQueryData('wishlistData');
            //console.log('Before mutation:', previousWishlistData);
            const idToRemove = paramsObject.id;
            const newWishlistData = previousWishlistData.data.filter(item => item._id !== idToRemove);
            queryClient.setQueryData('wishlistData', {
                ...previousWishlistData,
                data: newWishlistData
            });
            return { previousWishlistData, newWishlistData };
        },

        onError: (err, newWishlistData, context) => {
            queryClient.setQueryData('wishlistData', context.previousWishlistData);
        },
        onSettled: () => {
            //console.log('After mutation:', queryClient.getQueryData('wishlistData'));
            queryClient.invalidateQueries('wishlistData')
        }
    })
}

export default useDeleteWishlistItem
