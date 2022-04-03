import mongoose, { Schema, ObjectId } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },  
    category: {
        type: ObjectId,
        ref: "Category"
    },  
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, {timestamps: true})

productSchema.index({'$**': 'text'});

export default mongoose.model("Product", productSchema)
