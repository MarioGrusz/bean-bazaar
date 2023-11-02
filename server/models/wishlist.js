import mongoose from "mongoose";


const WishlistSchema = new mongoose.Schema({
    productsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'coffeeProduct' }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
  
const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;


//In this schema, ref is used to create a relationship between the wishlist and the product models. 
//This will allow you to populate the fields with the related documents 