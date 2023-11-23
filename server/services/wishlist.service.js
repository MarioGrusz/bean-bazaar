import findUserAndWishlist from '../utils/findUserAndWishlist.js';


const getWishlistItems = async (uid) => {

    try{
        
        const { wishlist } = await findUserAndWishlist(uid);

        if (!wishlist) return "Wishlist is empty"; 

        const populatedWishlist = await wishlist.populate('productsIds');

        if (populatedWishlist.productsIds.length === 0) {
            return []; 
        } else {
            return populatedWishlist.productsIds;
        }
        
    } catch (error) {
        console.error(`Error while retriving wishlist items: ${error.message}`);
    }

};


const addItemToWishlist = async (uid, productId) => {

    try {
 
        const { user, wishlist } = await findUserAndWishlist(uid);

        wishlist.productsIds.push(productId);
        await wishlist.save();
        console.log('Product added to wishlist:', productId);
        return user;

    } catch (error) {
        console.error(`Error while adding product id to wishlist: ${error.message}`);
        throw new Error('Error while adding product id to wishlist');
    }
};




const deleteWishlistItem = async (uid, productId) => {

    try{

        const { user, wishlist } = await findUserAndWishlist(uid);

        await wishlist.updateOne(
            { $pull: { productsIds: productId } }
        );
        await wishlist.save();
        console.log('Product removed from wishlist:', productId);
        return user;
       
    } catch (error) {
        console.error(`Error while deleting product id to wishlist: ${error.message}`);
    }

};

export {
    getWishlistItems,
    addItemToWishlist,
    deleteWishlistItem,
}



