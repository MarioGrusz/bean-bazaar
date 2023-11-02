import Wishlist from '../models/wishlist.js';
import User from '../models/user.js';


const getWishlistItems = async (uid) => {

    try{
        console.log('get wishlist')
        const user = await User.findOne({ firebaseId: uid });
        console.log(user)

        if (!user) {
            console.log('User not found.');
            return null;
        }

        const wishlist = await Wishlist.findOne({ creator: user._id }).populate('productsIds');

        console.log(wishlist)

        if (!wishlist || wishlist.productsIds.length === 0) {
            return "Wishlist is empty"; // or return an empty array, [].
        } else {
            return wishlist.productsIds;
        }
        
    } catch (error) {
        console.error(`Error while retriving wishlist items: ${error.message}`);
    }

};



//REFACTORED FUNCTION

const addItemToWishlist = async (uid, productId) => {
    try {
 
        const user = await User.findOne({ firebaseId: uid });

        if (!user) {
            console.log('User not found.');
            return null;
        }

        let wishlist = await Wishlist.findOne({ creator: user._id })

        if (!wishlist) {
            wishlist = new Wishlist({
                creator: user._id,
                productsIds: []
            });
            await wishlist.save();
        }

        wishlist.productsIds.push(productId);
        await wishlist.save();

        console.log('Product added to wishlist:', productId);
 
        return user;
    } catch (error) {
        console.error(`Error while adding product id to wishlist: ${error.message}`);
        throw new Error('Error while adding product id to wishlist');
    }
};




const deleteWishlistItem = async (productId) => {

    try{

        const wishlist = await Wishlist.findOne(); 

        // if (!wishlist) {
        //     return res.status(404).send();
        // };

        await wishlist.updateOne(
            { $pull: { productsIds: productId } }
        );

        
    } catch (error) {
        console.error(`Error while deleting product id to wishlist: ${error.message}`);
    }

};

export {
    getWishlistItems,
    addItemToWishlist,
    deleteWishlistItem,
}



