import mongoose, { Schema } from "mongoose"
import { createHmac } from "crypto"

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

userSchema.methods = {
    authenticate(password) {
        console.log(this.encrytPassword(password), "hoang");
        return this.password == this.encrytPassword(password);
    },
    encrytPassword(password) {
        if(!password) return
        try {
            return createHmac("sha256", "abcs").update(password).digest("hex");
        } catch (error) {
            console.log(error)
        }
    }
}

userSchema.pre("save", function(next) {
    this.password = this.encrytPassword(this.password)
    console.log(this.password);
    next()
})



export default mongoose.model("User", userSchema)