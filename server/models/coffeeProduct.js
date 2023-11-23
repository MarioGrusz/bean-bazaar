import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const coffeeProductSchema = new mongoose.Schema({
    shopName: {type: String, required: true},
    productName: {type: String, required: true},
    productOrigin: {type: String, required: true},
    productPrice: {type: String,  required: true},
    productImage: {type: String, required: true},
    productLink: {type: String, required: true},
    class: {type: String, default: ''}
});

coffeeProductSchema.plugin(mongoosePaginate);


const CoffeeProduct = mongoose.model('coffeeProduct', coffeeProductSchema);


export default CoffeeProduct;
