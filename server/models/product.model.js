import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    }
});

export default mongoose.model('Product', ProductSchema);
