const addItemToWishlist = async (uid, productId) => {
    try {
        console.log('UID service', uid);
        console.log('ID', productId)
 
        const user = await User.findOne({ firebaseId: uid });

        if (!user) {
            console.log('User not found.');
            return null;
        };

        let wishlist = await Wishlist.findOne({ _id: user.wishlist }); // Find the user's wishlist by its ObjectId

        // if (!wishlist) {
        //     // If the wishlist does not exist, create it
        //     wishlist = new Wishlist({
        //         creator: user._id,
        //         productsIds: []
        //     });
        //     await wishlist.save();
        // }
        // console.log(wishlist)

        wishlist.productsIds.push(productId);
        await wishlist.save();
        // await user.save();

        console.log(wishlist)


        //console.log('user', user)
 
       

        // const wishlist = await Wishlist.find({ _id: user.wishlist }); // Find the user's wishlist by its ObjectId
        // console.log('wishlist', wishlist)
 
        // if (!wishlist) {
        //     console.log('Wishlist not found.');
        //     return null;
        // }

        // if (!wishlist.productsIds) {
        //     wishlist.productsIds = []; // Initialize the array if it doesn't exist
        // }

        // wishlist.productsIds.push(productId); // Add the productId to the wishlist

        // console.log(wishlist)

        //await wishlist.save();
 
        //const userWishlist = user.wishlist = user.wishlist ?? new Wishlist();

        console.log('Product added to wishlist:', productId);
 
        return user;
    } catch (error) {
        console.error(`Error while adding product id to wishlist: ${error.message}`);
        throw new Error('Error while adding product id to wishlist');
    }
};



// const addItemToWishlistController = async (req, res) => {
   
//     try{

//         const idToken = req.headers.authorization.split('Bearer ')[1];
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         const uid = decodedToken.uid;

//         const productId = req.body.productId;
//         const productIdsArray = await addItemToWishlist(uid, productId);
//         res.status(200).json({ message: 'Product id added successfully to wishlist', data: productIdsArray});

//     } catch (error) {

//         res.status(500).json({ message: 'An error occurred', error: error.message });

//     }
// };
 