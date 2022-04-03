import mongoose, { Schema } from "mongoose"

const Category = new Schema({
    category: {
        type: String,
        required: true
    },
}, { timestamps: true })

export default mongoose.model('Category', Category)