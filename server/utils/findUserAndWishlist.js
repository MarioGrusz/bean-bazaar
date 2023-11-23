import Wishlist from '../models/wishlist.js';
import User from '../models/user.js'

const findUserAndWishlist = async (uid) => {
    const user = await User.findOne({ firebaseId: uid });
    if (!user) {
        console.log('User not found.');
        return null;
    }
 
    let wishlist = await Wishlist.findOne({ creator: user._id });
    if (!wishlist) {
        wishlist = new Wishlist({
            creator: user._id,
            productsIds: []
        });
        await wishlist.save();
    }
    return { user, wishlist };
};

export default findUserAndWishlist
 