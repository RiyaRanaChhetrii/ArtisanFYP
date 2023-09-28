// Import the mongoose library for MongoDB interactions
import mongoose from "mongoose"

//For User
const reviewSchema =mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true}

},{
    timestamps: true
})

const productSchema = mongoose.Schema({
    //Relationship between user and products
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // brand: {
    //     type: String,
    //     required: true,
    // },
    category: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
   
    numReviews: {
        type: Number,
        required: true,
        default: 0 
    },
    price: {
        type: Number,
        required: true,
        default: 0 
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0 
    },
}, {

    timestamps: true // Enable timestamps for automatic createdAt and updatedAt fields
})

const Product = mongoose.model('Product', productSchema)

export default Product  