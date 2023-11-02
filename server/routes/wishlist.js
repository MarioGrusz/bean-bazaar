/**
 * @method GET
 * @access private
 * @endpoint /api/v1/wishlist
**/

/**
 * @method POST
 * @access private
 * @endpoint /api/v1/wishlist/add
**/

/**
 * @method POST
 * @access private
 * @endpoint /api/v1/wishlist/delete
**/



import express from 'express';
import { 
    addItemToWishlistController, 
    getWishlistItemsController, 
    deleteWishlistItemController 
} from '../controllers/wishlist.controller.js';

import authenticateSession from '../middleware/auth.middleware.js';
const router = express.Router();
router.use(authenticateSession);

router.route("/").get(getWishlistItemsController);
router.route("/add").post(addItemToWishlistController);
router.route("/delete").post(deleteWishlistItemController);

export default router;




