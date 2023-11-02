import { useMutation, useQueryClient } from "react-query";
import { addItemToWishlist } from "../api/apiWishlist";


//optimistic updates https://www.phind.com/search?cache=jw8x9bseqf29cyc41qnmjiwe

const useAddToWishlist = () => {


    const queryClient = useQueryClient();
    return useMutation(({ id, token }) => addItemToWishlist(id, token), {
        onSuccess: () => {
            queryClient.invalidateQueries('wishlistData')
        }
    })
}

export default useAddToWishlist

//To pass a second parameter to the useMutation function in React Query, 
//you can use an object instead of multiple parameters. 
//This is because useMutation only accepts one parameter for variables

