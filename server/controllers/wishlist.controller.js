import { getWishlistItems, addItemToWishlist, deleteWishlistItem } from "../services/wishlist.service.js";


/**
 * @desc   add item to wishlist database
 * @route  POST /api/v1/wishlist/add
 * @access private
*/

const addItemToWishlistController = async (req, res, next) => {
  
    try{
        const uid = req.uid;
        const productId = req.body.productId;
        const productIdsArray = await addItemToWishlist(uid, productId);
        res.status(200).json({ message: 'Product id added successfully to wishlist', data: productIdsArray});
    } catch (error) {
        next(error);
    }
};



/**
 * @desc   get wishlist items
 * @route  POST /api/v1/wishlist/add
 * @access private
*/
 


const getWishlistItemsController = async (req, res, next) => {
    try{
        const uid = req.uid;
        const wishlistItems =  await getWishlistItems(uid);
        res.status(200).json({ message: 'Wishlist items successfully retrived', data: wishlistItems});

    } catch (error) {
        next(error);
    }

};



/**
 * @desc   delete item from wishlist database
 * @route  POST /api/v1/wishlist/delete
 * @access private
*/


const deleteWishlistItemController = async (req, res, next) => {
    try{
        const uid = req.uid;
        const productId = req.body.productId;
        const updatedWishlist = await deleteWishlistItem(uid, productId)
        res.status(200).json({ message: `Item ${productId} deleted successfully`, data: updatedWishlist});

    } catch (error) {
        next(error);
    }

};


export {
    addItemToWishlistController,
    getWishlistItemsController,
    deleteWishlistItemController,
}


