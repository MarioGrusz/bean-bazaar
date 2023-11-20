import { 
    getAllShopsNames, 
    getAllCoffeeOrigins, 
    findPaginatedProducts,
} from "../services/coffeeItem.service.js";



/**
 * @desc   getting all coffee data (optional: search, filters) with pagination
 * @route  GET /api/v1/data
 * @access public
*/

const findPaginatedProductsController = async (req, res, next) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchTerm = req.query.search || '';
        const isNew = req.query.isNew === 'true' ? true : req.query.isNew === 'false' ? false : false;


        const filters = {};
        const sort = {};

        if (req.query.filters) {
            const queryFilters = req.query.filters

            if (queryFilters.origin) {
              filters.productOrigin = queryFilters.origin;
            }

            if (queryFilters.roastery) {
                filters.shopName = queryFilters.roastery;
            }
        }
            

        if (req.query.sort === 'asc') {
            sort.productPrice = 1; 
        } else if (req.query.sort === 'desc') {
            sort.productPrice = -1; 
        };   

        console.log('filters from controller getPaginated', filters)
        console.log('PAGE', page)
        console.log('SORT', sort)

        const coffeeData = await findPaginatedProducts(limit, page, filters, searchTerm, sort, isNew);
        res.status(200).json({ message: 'Coffee products loaded successfully', data: coffeeData });

    } catch (error) {
        next(error);
        
    }
};



/**
 * @desc   getting all coffee online stores names (for filtering options on client side)
 * @route  GET /api/v1/roasteries
 * @access public
*/

const getShopsNamesController = async (req, res, next) => {
    try{
    
        const shopsNames = await getAllShopsNames();
        res.status(200).json({ message: 'Shops names loaded successfully', data: shopsNames});

    } catch (error) {
        next(error);
    }
};


/**
 * @desc   getting all coffee origins (for filtering options on client side)
 * @route  GET /api/v1/origins
 * @access public
*/

const getCoffeeOriginsController = async (req, res, next) => {
    try{
    
        const coffeeOrigins = await getAllCoffeeOrigins();
        res.status(200).json({ message: 'Coffee origins loaded successfully', data: coffeeOrigins});

    } catch (error) {
        next(error);
    }
};


export {
    getShopsNamesController,
    getCoffeeOriginsController,
    findPaginatedProductsController,
}