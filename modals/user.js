import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("User", userSchema)