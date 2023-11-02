import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    firebaseId: { type: String, required: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist'}],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

export default User;