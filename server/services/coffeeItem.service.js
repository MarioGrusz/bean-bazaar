import CoffeeProduct from "../models/coffeeProduct.js";
import isEmptyObject from "../utils/isEmptyObject.js";
import runScrapingFunctions from "../scrapers/scrapeFirstDataBatch.js";

/**
 *
 * @param {Number} limit
 * @param {Object} filter
 * @param {Number} page
 * @param {String} searchTerm
 * @param {Boolean} isNew
*/

const findPaginatedProducts = async (limit, page, filters, searchTerm, sort, isNew) => {

    try{

        const noFiltersPage = page;
        let options = {
            page: page,
            limit: limit, 
            sort: sort, 
        };
    
        if (searchTerm) {

            filters = {
                $and: [
                    filters,
                    {
                        $or: [
                            { shopName: { $regex: searchTerm, $options: 'i' } },
                            { productOrigin: { $regex: searchTerm, $options: 'i' } }
                        ]
                    },
                ]
            };
        };
   
        if (isNew) {
            filters = {
                ...filters,
                class: 'new'
            };
        };


        
        const totalCount = await CoffeeProduct.countDocuments(filters);

        options.page = !isEmptyObject(filters) ? 1 : noFiltersPage;
        options.limit = !isEmptyObject(filters) ? totalCount : limit;
        
        const coffeeData = await CoffeeProduct.paginate(filters, options)

        return coffeeData;
   

    } catch (error) {
        console.error('Error in findPaginatedProducts:', error);
        throw new Error('An error occurred while fetching coffee products.');
    }
};


// const createCoffeeData = async () => {

//     try{
//         const productsData = await runScrapingFunctions();
//         await CoffeeProduct.insertMany(productsData);

//     } catch (error) {
//         console.error(`Error in createCoffeeData: ${error.message}`);
//     }

// };

//REFACTORED https://www.phind.com/search?cache=xj22uahztnz8ynj5jqj7irnj
const createCoffeeData = async () => {

    try{
        const productsData = await runScrapingFunctions();

        const roasteryOptions = ["Hola Coffee Roasters", "NOMAD", "Toma Café"];
        const oldCoffeeData = await CoffeeProduct.find({});

        productsData.forEach((coffee) => {
            const existsInOldData = oldCoffeeData.some((oldCoffee) => oldCoffee.productLink === coffee.link);
            if (!existsInOldData) {
              coffee.class = 'new';
            }
        });

        for (const roastery of roasteryOptions) {
            await CoffeeProduct.deleteMany({ shopName: roastery });
        }
        const result = await CoffeeProduct.insertMany(productsData);

        console.log(`${result.length} documents were inserted into the collection.`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data scraping and storage process completed successfully."}),
        };
        

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred while scraping data." }),
        };
    }

};



const getAllShopsNames = async () => {

    try{    
        const uniqueShopNames = await CoffeeProduct.distinct('shopName');
        return uniqueShopNames;
    } catch (error) {
        throw new Error(error);
    }
};



const getAllCoffeeOrigins = async () => {

    try{    
        const uniqueCoffeeOrigins = await CoffeeProduct.distinct('productOrigin');
        return uniqueCoffeeOrigins;
    } catch (error) {
        throw new Error(error);
    }
};


export {
    findPaginatedProducts,
    createCoffeeData,
    getAllShopsNames,
    getAllCoffeeOrigins,
}


/** 
* it will find the products based on the req product category
* other products that has the same category will be returned 
*/
