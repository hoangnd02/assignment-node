import User from "../modals/user";
import jwt from "jsonwebtoken";
 
export const signup = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const existUser = await User.findOne({email}).exec()
        if(existUser){
            res.json({
                message: "Email đã tồn tại"
            })
        };
        const user = await new User({name, email, password}).save();
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Không thể đăng ký"
        })
    }
}

export const signin = async (req, res) => { 
    const {email, password} = req.body
    try {
        const user = await User.findOne({email}).exec();
        if(!user){
            return res.status(400).json({
                message: "email không tồn tại"
            })
        }

        if(!user.authenticate(password)){
            return res.status(400).json({
                message: "Sai mật khẩu"
            })
        }

        const token = jwt.sign({_id: user._id}, "123456", {expiresIn: 60*60*24})

        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "Không thể đăng nhập"
        })
    }
}

export const signinWithGG = async (req, res) => { 
    const {email, displayName} = req.body
    try {
        const user = await User.findOneAndUpdate({email}, {name: displayName, email}, {new: true}).exec();
        console.log(user);
        if(user) {
            res.json(user)
        } else {
            console.log({name: displayName, email})
            try {
                const newUser = await new User({name: displayName, email}).save()
                res.json(newUser)
            } catch (error) {
                console.log(error)                
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Không thể đăng nhập"
        })
    }
}
