import Wishlist from '../models/wishlist.js';
import CoffeeProduct from "../models/coffeeProduct.js";


const getWishlistItems = async () => {

    try{

        const wishlist = await Wishlist.findOne().populate('productsIds');

        if (!wishlist) {
            return res.status(404).send();
        };

        //console.log('wishlist service', wishlist.productsIds);   
        return wishlist.productsIds;
        
    } catch (error) {
        console.error(`Error while retriving wishlist items: ${error.message}`);
    }

};


// const getWishlistItems = async () => {
//     try {
//       const wishlist = await Wishlist.findOne();
  
//       if (wishlist) {
//         const products = await CoffeeProduct.find({ _id: { $in: wishlist.productsIds } });
//         return products;
//       }
  
//       return [];
//     } catch (error) {
//       console.error(`Error while retrieving wishlist items: ${error.message}`);
//     }
// };
  


// const getWishlistItems = async () => {

//     try{

//         const wishlist = await Wishlist.findOne();

//         console.log('wishlist service', wishlist.productsIds);   
//         return wishlist.productsIds;
        
//     } catch (error) {
//         console.error(`Error while retriving wishlist items: ${error.message}`);
//     }

// };

// const getWishlistItems = async () => {
//     try {
//       const wishlist = await Wishlist.findOneAndUpdate(
//         {}, // Filter
//         {}, // Update
//         { new: true } // Options
//       ).populate('productsIds');

//       console.log('wishlist service', wishlist.productsIds); 
//       return wishlist.productsIds;
//     } catch (error) {
//       console.error(`Error while retrieving wishlist items: ${error.message}`);
//     }
// };

// const getWishlistItems = async () => {
//     try {

//       const wishlist = await Wishlist.findOne();
//       await wishlist.populate('productsIds').execPopulate();

//       return wishlist.productsIds;
//     } catch (error) {
//       console.error(`Error while retrieving wishlist items: ${error.message}`);
//     }
// }


// const addItemToWishlist = async (productId) => {
//     try {
//       const wishlist = await Wishlist.findOneAndUpdate(
//         {}, // Filter
//         { $push: { productsIds: productId } }, // Update
//         { new: true, useFindAndModify: false } // Options
//       );
//       return wishlist.productsIds;
//     } catch (error) {
//       console.error(`Error while adding product to wishlist: ${error.message}`);
//     }
// };
  
  


const addItemToWishlist = async (productId) => {

    try{

        let wishlist = await Wishlist.findOne(); 

        if (!wishlist) {
            wishlist = new Wishlist();
        };

        wishlist.productsIds.push(productId);
        await wishlist.save();    
        
        const wishlistItems = await getWishlistItems();
        return wishlistItems;
        //return wishlist;

        
    } catch (error) {
        console.error(`Error while adding product id to wishlist: ${error.message}`);
    }

};

// const addItemToWishlist = async (productId) => {
//     try {
//       const wishlist = await Wishlist.findOneAndUpdate(
//         {}, // Filter
//         { $push: { productsIds: productId } }, // Update
//         { new: true, useFindAndModify: false } // Options
//       );
//       return wishlist.productsIds;
//     } catch (error) {
//       console.error(`Error while adding product to wishlist: ${error.message}`);
//     }
//   };
  


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