/**
 * @method GET
 * @access public
 * @endpoint /api/v1/data
**/

/**
 * @method GET
 * @access public
 * @endpoint /api/v1/data/roasteries
**/

/**
 * @method GET
 * @access public
 * @endpoint /api/v1/data/origins
**/



import express from 'express';
import { 
    findPaginatedProductsController,
    getCoffeeOriginsController, 
    getShopsNamesController 
} from '../controllers/coffeeItem.controller.js';
const router = express.Router();


router.route("/").get(findPaginatedProductsController);
router.route("/roasteries").get(getShopsNamesController);
router.route("/origins").get(getCoffeeOriginsController);



export default router;